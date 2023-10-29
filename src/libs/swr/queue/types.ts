import {
  Arguments,
  FullConfiguration,
  Key,
  State,
  SWRResponse,
} from 'swr/_internal';
import { SWRTimelineFetcher, Timeline } from '@/libs/swr/timeline/types';

export interface SWRQueueResponse<Data = any, Error = any>
  extends Pick<SWRResponse<Data, Error>, 'error'> {
  data: Timeline<Data> | undefined;
  isValidating: boolean;
  isLoading: boolean;
  reset: (since: Data) => Promise<Timeline<Data> | undefined>;
}

export interface SWRQueueConfiguration<Data, Error>
  extends Partial<
    Pick<
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
    >
  > {
  refreshInterval: number | ((latestData: Data | undefined) => number);
}

export interface SWRQueueHook {
  <Data = any, Error = any>(
    key: Key,
    fetcher: SWRTimelineFetcher<Data> | null,
    config: SWRQueueConfiguration<Data, Error>,
  ): SWRQueueResponse<Data, Error>;
}

export interface SWRQueueCacheValue<Data, Error = any>
  extends State<Timeline<Data>, Error> {
  // key
  _k?: Arguments;
  // since
  _s?: Data;
}
