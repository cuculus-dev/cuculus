import { UserPost } from '@cuculus/cuculus-api';
import { timelinesApi } from '@/libs/cuculus-client';
import useSWRTimeline from '@/libs/swr/timeline';
import { getAuthorizationHeader } from '@/libs/auth';
import { useAuth } from '@/swr/client/auth';

const LIMIT = 20;

type TimelineKey = {
  key: string;
  sinceId: string | null;
  maxId: string | null;
  authId: number;
};

const getKey =
  (key: string, authId: number) =>
  (since: UserPost | null, max: UserPost | null): TimelineKey => {
    return {
      key: key,
      sinceId: since?.id ?? null,
      maxId: max?.id ?? null,
      authId,
    };
  };

const fetcher = async (key: TimelineKey) => {
  const posts = await timelinesApi.getHomeTimeline(
    {
      sinceId: key.sinceId ?? undefined,
      maxId: key.maxId ?? undefined,
      limit: LIMIT,
    },
    {
      headers: await getAuthorizationHeader(key.authId),
    },
  );
  return {
    data: posts,
    possiblyHasGap: key.sinceId !== null && posts.length >= LIMIT, //取得し切れなかった時にtrueを返す
  };
};

/**
 * メインとなるタイムライン
 */
export const useHomeTimeline = () => {
  const { data: authId } = useAuth();
  const swrKey = authId ? getKey('useHomeTimeline', authId) : () => null;
  return useSWRTimeline<UserPost, Error, TimelineKey>(swrKey, fetcher, {
    refreshInterval: 5000,
    enableQueue: true,
  });
};

/**
 * メインとなるタイムライン
 * 自動更新OFF
 */
export const useHomeTimelineImmutable = () => {
  const { data: authId } = useAuth();
  const swrKey = authId ? getKey('useHomeTimeline', authId) : () => null;
  return useSWRTimeline<UserPost, Error, TimelineKey>(swrKey, fetcher, {
    enableQueue: true,
  });
};
