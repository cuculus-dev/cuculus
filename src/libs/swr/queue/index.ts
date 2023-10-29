import useSWR, { BareFetcher, Middleware, SWRConfig } from 'swr';
import {
  createCacheHelper,
  Key,
  serialize,
  SWRResponse,
  withMiddleware,
} from 'swr/_internal';
import { SWRTimelineFetcher, Timeline } from '@/libs/swr/timeline/types';
import { useCallback } from 'react';
import {
  SWRQueueCacheValue,
  SWRQueueConfiguration,
  SWRQueueHook,
  SWRQueueResponse,
} from '@/libs/swr/queue/types';

const findLatest = <Data>(timeline: Timeline<Data>): Data | undefined => {
  const data = timeline.find((data) => Array.isArray(data)) as
    | Data[]
    | undefined;
  if (data && data.length > 0) {
    return data[0];
  }
  return undefined;
};

/**
 * 専用SWRHook
 */
interface SWRHook<T> {
  <Data = Timeline<T>, Error = any>(
    key: Key,
    fetcher: BareFetcher<Data> | null,
    config?: any,
  ): SWRResponse<Data, Error>;
}

const queue = (<Data, Error>(useSWRNext: SWRHook<Data>) =>
  (
    _key: Key,
    fetcher: SWRTimelineFetcher<Data> | null,
    config: Omit<typeof SWRConfig.defaultValue, 'fetcher'> &
      SWRQueueConfiguration<Data, Error>,
  ): SWRQueueResponse<Data, Error> => {
    const { cache } = config;
    const [key] = serialize(_key);
    const [get, set] = createCacheHelper<Data, SWRQueueCacheValue<Data>>(
      cache,
      key,
    );

    const swr: SWRResponse<Timeline<Data> | undefined, Error> = useSWRNext(
      key,
      async (): Promise<Timeline<Data> | undefined> => {
        const cache = get();
        const cacheData = cache.data;

        // cache > since の順で優先してlatestを特定
        const latest = findLatest<Data>(cacheData ?? []) ?? cache._s;

        // 差分を取得
        if (latest && fetcher) {
          const newData = cacheData ? [...cacheData] : [];
          const fetched = await fetcher(latest, null);
          if (fetched && fetched.data.length > 0) {
            if (fetched.hasGap && fetched.data.length > 0 && latest) {
              newData.unshift({
                since: latest,
                max: fetched.data[fetched.data.length - 1],
              });
            }
            newData.unshift(fetched.data);
          }
          return newData;
        }

        // latestが特定できない場合は何もしない
        return [];
      },
      config,
    );

    const reset = useCallback(
      async (since: Data): Promise<Timeline<Data> | undefined> => {
        set({ data: [], _s: since });
        return await swr.mutate();
      },
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
      reset,
    };
  }) as unknown as Middleware;

const useSWRQueue = withMiddleware(useSWR, queue) as unknown as SWRQueueHook;

export default useSWRQueue;
