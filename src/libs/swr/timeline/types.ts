import { Arguments, State, SWRConfiguration, SWRResponse } from 'swr/_internal';

export type SWRTimelineKeyLoader<Data, SWRKey extends Arguments = Arguments> = (
  since: Data | null,
  max: Data | null,
) => SWRKey;

export type Gap<Data> = {
  since: Data;
  max: Data;
};

/**
 * fetcherの返却値
 */
export type FetchResultData<Data> = {
  data: Data[];
  possiblyHasGap: boolean; // データを取得し切れなかった可能性がある
};
/**
 * fetch結果
 */
export type ResultData<Data> = Data[] | Gap<Data>; // フェッチ単位
/**
 * fetch結果のまとめ
 */
export type TimelineData<Data> = ResultData<Data>[]; // Timeline

/**
 * fetcherの型
 */
export type SWRTimelineFetcher<Data, SWRKey extends Arguments> = (
  arg: SWRKey,
) => Promise<FetchResultData<Data> | undefined>;

export interface SWRTimelineResponse<Data, Error = never>
  extends Pick<SWRResponse<Data, Error>, 'error'> {
  data: TimelineData<Data> | undefined;
  isValidating: boolean;
  isLoading: boolean;
  mutateLatest: () => Promise<TimelineData<Data> | undefined>;
  mutateOlder: () => Promise<TimelineData<Data> | undefined>;
  mutateGap: (gap: Gap<Data>) => Promise<TimelineData<Data> | undefined>;
  queue: TimelineData<Data> | undefined;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SWRTimelineConfiguration<Data, Error = any>
  extends Omit<SWRConfiguration<Data, Error>, 'compare'> {
  enableQueue?: boolean;
}

export interface SWRTimelineHook {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Data, Error = any, SWRKey extends Arguments = Arguments>(
    getKey: SWRTimelineKeyLoader<Data, SWRKey>,
    fetcher: SWRTimelineFetcher<Data, SWRKey> | null,
  ): SWRTimelineResponse<Data, Error>;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Data, Error = any, SWRKey extends Arguments = Arguments>(
    getKey: SWRTimelineKeyLoader<Data, SWRKey>,
    fetcher: SWRTimelineFetcher<Data, SWRKey> | null,
    config: SWRTimelineConfiguration<Data, Error>,
  ): SWRTimelineResponse<Data, Error>;
}

export interface TimelineDataCacheValue<
  Data,
  Error,
  SWRKey extends Arguments = Arguments,
> extends State<TimelineData<Data>, Error> {
  // key
  _k?: Arguments;
  // Keys
  _keys?: SWRKey[];
  // mutate trigger
  _trigger?: 'older' | 'latest' | 'gap';
}

export interface ResultDataCacheValue<Data = never, Error = never>
  extends State<ResultData<Data>, Error> {
  // key
  _k?: Arguments;
}
