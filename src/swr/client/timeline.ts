import { UserPost } from '@cuculus/cuculus-api';
import { timelinesApi } from '@/libs/cuculus-client';
import useSWRTimeline from '@/libs/swr/timeline';

const LIMIT = 20;

type TimelineKey = {
  key: string;
  sinceId: string | null;
  maxId: string | null;
};

const getKey =
  (key: string) =>
  (since: UserPost | null, max: UserPost | null): TimelineKey => {
    return {
      key: key,
      sinceId: since?.id ?? null,
      maxId: max?.id ?? null,
    };
  };

const fetcher = async (key: TimelineKey) => {
  const posts = await timelinesApi.getHomeTimeline({
    sinceId: key.sinceId ?? undefined,
    maxId: key.maxId ?? undefined,
    limit: LIMIT,
  });
  return {
    data: posts,
    possiblyHasGap: key.sinceId !== null && posts.length >= LIMIT, //取得し切れなかった時にtrueを返す
  };
};

/**
 * メインとなるタイムライン
 */
export const useHomeTimeline = () => {
  return useSWRTimeline<UserPost, Error, TimelineKey>(
    getKey('useHomeTimeline'),
    fetcher,
    { refreshInterval: 5000, enableQueue: true },
  );
};
