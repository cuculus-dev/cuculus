import { UserPost } from '@cuculus/cuculus-api';
import { timelinesApi } from '@/libs/cuculus-client';
import useSWRTimeline from '@/libs/swr/timeline';
import { getAuthorizationHeader } from '@/libs/auth';
import { useAuth } from '@/swr/client/auth';

// タイムライン取得件数
const LIMIT = 20;

type TimelineKey = {
  key: string;
  sinceId: string | null;
  maxId: string | null;
  authId: number;
};

// タイムライン専用のキー生成関数
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

/**
 * ホームタイムライン取得
 */
export const useHomeTimeline = () => {
  const { data: authId } = useAuth();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const swrKey = authId ? getKey('useHomeTimeline', authId) : () => null;
  return useSWRTimeline<UserPost, Error, TimelineKey>(
    swrKey,
    async (key) => {
      const posts = await timelinesApi.getHomeTimeline(
        {
          sinceId: key.sinceId ?? undefined,
          maxId: key.maxId ?? undefined,
          limit: LIMIT,
        },
        {
          headers: await getAuthorizationHeader(authId),
        },
      );
      return {
        data: posts,
        //取得し切れなかった時にtrueを返す
        possiblyHasGap: key.sinceId !== null && posts.length >= LIMIT,
      };
    },
    {
      refreshInterval: 5000,
      enableQueue: true,
    },
  );
};
