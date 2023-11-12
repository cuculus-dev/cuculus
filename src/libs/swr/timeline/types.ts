import {
  Arguments,
  FullConfiguration,
  Key,
  State,
  SWRResponse,
} from 'swr/_internal';

/**
 * 取得漏れの可能性があるデータの範囲
 */
export type Gap<Data> = {
  since: Data;
  max: Data;
};

/**
 * 返却されるdataの型
 */
export type Timeline<Data> = Array<Data[] | Gap<Data>>;

/**
 * fetcherに返却して欲しい型
 */
export type TimelineResult<Data> = {
  data: Data[];
  hasGap: boolean;
};

/**
 * fetcherの返却値
 */
type FetcherResponse<Data> = Promise<TimelineResult<Data>> | Promise<undefined>;

/**
 * fetcherの型
 */
export type SWRTimelineFetcher<Data> = (
  since: Data | null,
  max: Data | null,
) => FetcherResponse<Data>;

export interface SWRTimelineResponse<Data = any, Error = any>
  extends Pick<SWRResponse<Data, Error>, 'error'> {
  data: Timeline<Data> | undefined;
  isValidating: boolean;
  isLoading: boolean;
  mutateLatest: (data?: Timeline<Data>) => Promise<Timeline<Data> | undefined>;
  mutateOlder: (data?: Data[]) => Promise<Timeline<Data> | undefined>;
  mutateGap: (gap: Gap<Data>) => Promise<Timeline<Data> | undefined>;
}

export type SWRTimelineConfiguration<Data, Error> = Pick<
  FullConfiguration<Data, Error>,
  | 'revalidateOnFocus'
  | 'revalidateOnReconnect'
  | 'revalidateIfStale'
  | 'shouldRetryOnError'
  | 'errorRetryInterval'
  | 'focusThrottleInterval'
  | 'dedupingInterval'
  | 'loadingTimeout'
  | 'cache'
  | 'fallback'
  | 'use'
>;

export interface SWRTimelineHook {
  <Data = any, Error = any>(key: Key): SWRTimelineResponse<Data, Error>;

  <Data = any, Error = any>(
    key: Key,
    fetcher: SWRTimelineFetcher<Data> | null,
  ): SWRTimelineResponse<Data, Error>;

  // いずれConfigを使うときに機能を絞り追加する
  // <Data = any, Error = any>(
  //   key: Key,
  //   fetcher: SWRTimelineFetcher<Data> | null,
  //   config?: SWRTimelineConfiguration<Data, Error>,
  // ): SWRTimelineResponse<Data, Error>;
}

export interface SWRTimelineCacheValue<Data, Error = any>
  extends State<Timeline<Data>, Error> {
  // key
  _k?: Arguments;
}
