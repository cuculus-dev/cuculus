import useSWR, { BareFetcher, Middleware, SWRConfig } from 'swr';
import {
  createCacheHelper,
  Key,
  serialize,
  SWRGlobalState,
  SWRResponse,
  withMiddleware,
  cache as defaultCache,
  GlobalState,
  getTimestamp,
} from 'swr/_internal';
import {
  FetchResultData,
  Gap,
  ResultDataCacheValue,
  SWRTimelineConfiguration,
  SWRTimelineFetcher,
  SWRTimelineHook,
  SWRTimelineKeyLoader,
  SWRTimelineResponse,
  TimelineData,
  TimelineDataCacheValue,
} from '@/libs/swr/timeline/types';
import { useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';
import { findLatest, findOldest } from '@/libs/swr/timeline/utils';

const TIMELINE_PREFIX = '$timeline$';
const QUEUE_PREFIX = '$queue$';

/**
 * 専用SWRHook
 */
interface SWRHook<T> {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Data = TimelineData<T>, Error = any, SWRKey extends Key = Key>(
    key: SWRKey,
    fetcher: BareFetcher<Data> | null,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any,
  ): SWRResponse<Data, Error>;
}

const timeline = (<Data, Error, SWRKey extends Key = Key>(
    useSWRNext: SWRHook<Data>,
  ) =>
  (
    getKey: SWRTimelineKeyLoader<Data, SWRKey>,
    fetcher: SWRTimelineFetcher<Data, SWRKey> | null,
    config: Omit<typeof SWRConfig.defaultValue, 'fetcher'> &
      Omit<SWRTimelineConfiguration<Data, Error>, 'fetcher'>,
  ): SWRTimelineResponse<Data, Error> => {
    // be Immutable
    config.revalidateOnFocus = false;
    config.revalidateIfStale = false;
    config.revalidateOnReconnect = false;

    const { cache, enableQueue = false } = config;
    const [, , FETCH] = SWRGlobalState.get(defaultCache) as GlobalState;

    let timelineKey: string | undefined;
    let queueKey: string | undefined;
    try {
      const serialized = serialize(getKey(null, null))[0];
      if (serialized) {
        timelineKey = TIMELINE_PREFIX + serialized;
        queueKey = QUEUE_PREFIX + serialized;
      }
    } catch (err) {
      // Not ready yet.
    }

    /**
     * キー値から再検証を行い、検証結果を返す
     * @param _keys キー値
     * @param _latest 最新のデータ
     */
    const validateKeys = useCallback(
      async (
        _keys: SWRKey[],
        _latest: Data | undefined,
      ): Promise<[SWRKey[], TimelineData<Data>]> => {
        const data: TimelineData<Data> = [];
        const keys: SWRKey[] = [];

        let prevOldest: Data | undefined;

        // 前回のキャッシュキーから取得
        for (const _key of _keys) {
          // 次のループに引き継ぐフラグ
          let possiblyHasGap = false;
          const [pageKey, pageArg] = serialize(_key);

          const [getSWRCache, setSWRCache] = createCacheHelper<
            Data,
            ResultDataCacheValue<Data>
          >(cache, pageKey);

          let pageData = getSWRCache().data;
          // 再検証フラグ
          const shouldFetchPage = pageData === undefined;
          if (fetcher && shouldFetchPage) {
            // 実行中のfetchがないか確認
            if (!(pageKey in FETCH)) {
              FETCH[pageKey] = [fetcher(_key), getTimestamp()];
            }
            let resultData: FetchResultData<Data> | undefined;
            try {
              resultData = (await FETCH[pageKey][0]) as
                | FetchResultData<Data>
                | undefined;
            } finally {
              delete FETCH[pageKey];
            }

            // 空だった場合は何もしない
            if (resultData && resultData?.data.length > 0) {
              pageData = resultData?.data;
              setSWRCache({ data: pageData, _k: pageArg });

              // 次のループに引き継ぐフラグを立てる
              possiblyHasGap = resultData?.possiblyHasGap ?? false;
            }
          }

          // undefinedだった場合はなかったことにする
          if (pageData) {
            if (Array.isArray(pageData)) {
              // 前回のループで取得漏れがあった場合はここで処理を行う
              if (prevOldest) {
                // gap追加処理
                if (pageData.length > 0) {
                  const gap: Gap<Data> = {
                    since: pageData[0],
                    max: prevOldest,
                  };
                  const gapHistory: SWRKey = getKey(gap.since, gap.max);
                  const [gapKey, gapArg] = serialize(gapHistory);
                  const [, setGapCache] = createCacheHelper<
                    Data,
                    ResultDataCacheValue<Data>
                  >(cache, gapKey);
                  setGapCache({ data: gap, _k: gapArg });
                  data.push(gap);
                  keys.push(gapHistory);
                }
                // reset
                prevOldest = undefined;
              }

              // 今回取得漏れが発生していた場合、次回に引き継ぐ
              if (possiblyHasGap && pageData.length > 0) {
                prevOldest = pageData[pageData.length - 1];
              }
            }

            // 追加
            data.push(pageData);
            keys.push(_key);
          }
        }

        // 最後のループで取得漏れがあった場合はここで処理を行う
        if (prevOldest && _latest) {
          const gap: Gap<Data> = {
            since: _latest,
            max: prevOldest,
          };
          const gapHistory: SWRKey = getKey(gap.since, gap.max);
          const [gapKey, gapArg] = serialize(gapHistory);
          const [, setGapCache] = createCacheHelper<
            Data,
            ResultDataCacheValue<Data>
          >(cache, gapKey);
          setGapCache({ data: gap, _k: gapArg });
          data.push(gap);
          keys.push(gapHistory);
        }

        return [keys, data];
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [cache],
    );

    const [, set] = createCacheHelper<
      Data,
      TimelineDataCacheValue<Data, Error, SWRKey>
    >(cache, timelineKey);

    const [getQueue, setQueue] = createCacheHelper<
      Data,
      Omit<TimelineDataCacheValue<Data, Error, SWRKey>, '_trigger'>
    >(cache, queueKey);

    const swrQueue: SWRResponse<TimelineData<Data> | undefined, Error> =
      useSWRImmutable(
        queueKey,
        async (key: string): Promise<TimelineData<Data> | undefined> => {
          const [getCache, setCache] = createCacheHelper<
            Data,
            Omit<TimelineDataCacheValue<Data, Error, SWRKey>, '_trigger'>
          >(cache, key);

          // 前回のキャッシュキー
          const _keys = getCache()._keys;
          if (_keys) {
            const [keys, data] = await validateKeys(_keys, getCache()._latest);
            setCache({ _keys: keys });
            return data;
          }
          return [];
        },
      );

    // Actual SWR hook to load all pages in one fetcher.
    const swr: SWRResponse<TimelineData<Data> | undefined, Error> = useSWRNext(
      timelineKey,
      async (key: string): Promise<TimelineData<Data> | undefined> => {
        // タイムラインのキャッシュヘルパー
        const [getCache, setCache] = createCacheHelper<
          Data,
          TimelineDataCacheValue<Data, Error, SWRKey>
        >(cache, key);

        // キャッシュから各種データを取得
        let _keys = getCache()._keys;
        const _trigger = getCache()._trigger;
        const cacheData = getCache().data;

        // 処理タイプの判別
        if (_keys === undefined || _keys.length === 0) {
          /**
           * 初回読み込み
           * 1. _keysに初期値をいれる
           */
          _keys = [getKey(null, null)];
        } else if (_trigger === 'older') {
          /**
           * 過去の投稿の読み込み
           * 1. キャッシュから最古のデータを取得
           * 2. _keysの最後尾に追加
           */
          const oldest = cacheData ? findOldest(cacheData) : undefined;
          if (oldest) {
            _keys = [..._keys, getKey(null, oldest)];
          }
        } else if (_trigger === 'gap') {
          /**
           * 取得漏れの読み込み
           * mutateGapで既に処理済みのため、ここでは何もしない
           */
        } else if (_trigger === 'latest' || _trigger === undefined) {
          // キューの更新(ここで更新は起こらない想定)
          let queueData: TimelineData<Data> | undefined;
          if ((getQueue()._keys?.length ?? 0) > 0) {
            queueData = await swrQueue.mutate();
          }

          // queueとcacheから最新の投稿を取得
          let latest = queueData ? findLatest(queueData) : undefined;
          if (latest === undefined) {
            latest = cacheData ? findLatest(cacheData) : undefined;
          }

          // あり得ないのでエラー処理
          if (!latest) {
            throw new Error('latest is undefined');
          }

          const queueKeys = getQueue()._keys;
          const latestKey = getKey(latest, null);

          if (_trigger === undefined && enableQueue) {
            /**
             * キューが有効かつ通常の読み込み
             * 1. キューに積み上げていく
             */
            if (queueKeys && queueKeys.length > 0) {
              setQueue({ _keys: [latestKey, ...queueKeys], _latest: latest });
            } else {
              setQueue({ _keys: [latestKey], _latest: latest });
            }
          } else {
            /**
             * 最新の投稿を読み込む
             * 1. キューのデータを移し替える
             * 2. _keysの先頭に最新のキー値を追加
             */
            if (queueKeys && queueKeys.length > 0) {
              _keys = [...queueKeys, ..._keys];
              setQueue({ _keys: [] });
            }
            _keys = [latestKey, ..._keys];
          }
        }

        // トリガーのリセット
        setCache({ _trigger: undefined });

        // キャッシュの更新
        const [keys, data] = await validateKeys(_keys, undefined);
        setCache({ _keys: keys });

        // キューの更新
        await swrQueue.mutate();

        return data;
      },
      config,
    );

    // 最新の投稿を読み込む
    const mutateLatest = useCallback(
      async (): Promise<TimelineData<Data> | undefined> => {
        set({ _trigger: 'latest' });
        return swr.mutate();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [timelineKey, cache],
    );

    // 過去の投稿を読み込む
    const mutateOlder = useCallback(
      async (): Promise<TimelineData<Data> | undefined> => {
        set({ _trigger: 'older' });
        return swr.mutate();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [timelineKey, cache],
    );

    // mutateGap
    const mutateGap = useCallback(
      async (gap: Gap<Data>): Promise<TimelineData<Data> | undefined> => {
        const gapHistory: SWRKey = getKey(gap.since, gap.max);
        const [gapKey, gapArg] = serialize(gapHistory);
        const [getGapCache, setGapCache] = createCacheHelper<
          Data,
          ResultDataCacheValue<Data>
        >(cache, gapKey);
        if (getGapCache().data) {
          setGapCache({ data: undefined, _k: gapArg });
        }
        set({ _trigger: 'gap' });
        return swr.mutate();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [timelineKey, cache],
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
      get queue() {
        return swrQueue.data;
      },
    };
  }) as unknown as Middleware;

const useSWRTimeline = withMiddleware(
  useSWR,
  timeline,
) as unknown as SWRTimelineHook;

export default useSWRTimeline;
