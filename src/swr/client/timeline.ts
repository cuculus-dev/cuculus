import { UserPost } from '@cuculus/cuculus-api';
import { timelinesApi } from '@/libs/cuculus-client';
import useSWRTimeline from '@/libs/swr/timeline';
import useSWRQueue from '@/libs/swr/queue';

const LIMIT = 20;

const fetcher = async (since: UserPost | null, max: UserPost | null) => {
  const posts = await timelinesApi.getHomeTimeline({
    sinceId: since?.id,
    maxId: max?.id,
    limit: LIMIT,
  });
  return {
    data: posts,
    hasGap: since !== null && posts.length >= LIMIT, //取得し切れなかった時にtrueを返す
  };
};

/**
 * メインとなるタイムライン
 */
export const useHomeTimeline = () => {
  return useSWRTimeline<UserPost>('useHomeTimeline', fetcher);
};

/**
 * キューイング
 */
export const useHomeQueue = () => {
  return useSWRQueue<UserPost>('useHomeQueue', fetcher, {
    refreshInterval: 5000,
  });
};
