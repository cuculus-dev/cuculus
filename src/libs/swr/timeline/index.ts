import useSWR, { BareFetcher, Middleware } from 'swr';
import {
  createCacheHelper,
  Key,
  serialize,
  SWRResponse,
  withMiddleware,
} from 'swr/_internal';
import {
  Gap,
  SWRTimelineCacheValue,
  SWRTimelineConfiguration,
  SWRTimelineFetcher,
  SWRTimelineHook,
  SWRTimelineResponse,
  Timeline,
  TimelineResult,
} from '@/libs/swr/timeline/types';
import { useCallback } from 'react';
import { serializeGap } from '@/libs/swr/timeline/serialize';

const findLatest = <Data>(timeline: Timeline<Data>): Data | undefined => {
  const data = timeline.find((data) => Array.isArray(data)) as
    | Data[]
    | undefined;
  if (data && data.length > 0) {
    return data[0];
  }
  return undefined;
};

const findGap = <Data>(timeline: Timeline<Data>, gap: Gap<Data>): number => {
  const key = serializeGap(gap);
  return timeline.findIndex((data) => {
    if (!Array.isArray(data)) {
      return key === serializeGap(data);
    }
  });
};

const findOldest = <Data>(timeline: Timeline<Data>): Data | undefined => {
  let data: Data[] | undefined;
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (Array.isArray(timeline[i])) {
      data = timeline[i] as Data[];
      break;
    }
  }
  if (data && data.length > 0) {
    return data[data.length - 1];
  }
  return undefined;
};

/**
 * 専用SWRHook
 */
interface SWRHook<T> {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Data = Timeline<T>, Error = any>(
    key: Key,
    fetcher: BareFetcher<Data> | null,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any,
  ): SWRResponse<Data, Error>;
}

const timeline = (<Data, Error>(useSWRNext: SWRHook<Data>) =>
  (
    _key: Key,
    fetcher: SWRTimelineFetcher<Data> | null,
    config: SWRTimelineConfiguration<Data, Error>,
  ): SWRTimelineResponse<Data, Error> => {
    const { cache } = config;
    const [key] = serialize(_key);
    const [get, set] = createCacheHelper<Data, SWRTimelineCacheValue<Data>>(
      cache,
      key,
    );

    const swr: SWRResponse<Timeline<Data> | undefined, Error> = useSWRNext(
      key,
      async (): Promise<Timeline<Data> | undefined> => {
        // 前回のデータ
        const cacheData = get().data;
        if (cacheData && cacheData.length > 0) {
          set({ isValidating: false });
          return cacheData;
        }
        // 初回のデータ
        if (fetcher) {
          const result = await fetcher(null, null);
          if (result) {
            return result.data.length > 0 ? [result.data] : [];
          }
        }
      },
      {
        ...config,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
      },
    );

    // mutateLatest
    const mutateLatest = useCallback(
      async (
        data?: TimelineResult<Data> | Timeline<Data>,
      ): Promise<Timeline<Data> | undefined> => {
        const cache = get();
        const cacheData = cache.data;
        if (cacheData && !cache.isValidating) {
          const latest = findLatest<Data>(cacheData);
          if (latest && fetcher) {
            set({ isValidating: true });
            if (data && Array.isArray(data)) {
              return swr.mutate([...data, ...cacheData]);
            }
            const fetched = data ?? (await fetcher(latest, null));
            if (fetched && fetched.data.length > 0) {
              const newData = [...cacheData];
              if (fetched.hasGap && fetched.data.length > 0) {
                newData.unshift({
                  since: latest,
                  max: fetched.data[fetched.data.length - 1],
                });
              }
              newData.unshift(fetched.data);
              return swr.mutate(newData);
            }
          }
        }
        return swr.mutate();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [key, cache],
    );

    // mutateGap
    const mutateGap = useCallback(
      async (
        gap: Gap<Data>,
        data?: TimelineResult<Data>,
      ): Promise<Timeline<Data> | undefined> => {
        const cache = get();
        const cacheData = cache.data;
        if (cacheData && !cache.isValidating) {
          const index = findGap<Data>(cacheData, gap);
          if (index >= 0 && fetcher) {
            set({ isValidating: true });
            const fetched = data ?? (await fetcher(gap.since, gap.max));
            /**
             * パターン
             * [] + true ... 何もしない
             * [] + false ... 消す
             * [1,2,3] + true ... 追加されgapが生まれる
             * [1,2,3] + false ... 追加されgapが消える
             */
            if (fetched) {
              const newData = [...cacheData];
              if (fetched.data.length > 0) {
                if (fetched.hasGap) {
                  newData.splice(index, 1, fetched.data, {
                    since: gap.since,
                    max: fetched.data[fetched.data.length - 1],
                  });
                } else {
                  newData.splice(index, 1, fetched.data);
                }
              } else if (!fetched.hasGap) {
                newData.splice(index, 1);
              }
              return swr.mutate(newData);
            }
          }
        }
        return swr.mutate();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [key, cache],
    );

    // mutateOlder
    const mutateOlder = useCallback(
      async (data?: Data[]): Promise<Timeline<Data> | undefined> => {
        const cache = get();
        const cacheData = cache.data;
        if (cacheData && !cache.isValidating) {
          const oldest = findOldest<Data>(cacheData);
          if (oldest && fetcher) {
            set({ isValidating: true });
            const fetched = data ?? (await fetcher(null, oldest))?.data;
            if (fetched && fetched.length > 0) {
              return swr.mutate([...cacheData, fetched]);
            }
          }
        }
        return swr.mutate();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [key, cache],
    );

    return {
      get data() {
        return swr.data;
      },
      get error() {
        return swr.error;
      },
      get isValidating() {
        return swr.isValidating;
      },
      get isLoading() {
        return swr.isLoading;
      },
      mutateLatest,
      mutateOlder,
      mutateGap,
    };
  }) as unknown as Middleware;

const useSWRTimeline = withMiddleware(
  useSWR,
  timeline,
) as unknown as SWRTimelineHook;

export default useSWRTimeline;
