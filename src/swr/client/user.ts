import useSWR from 'swr';
import { usersApi } from '@/libs/cuculus-client';
import { UserPost, UserWithFollows } from '@cuculus/cuculus-api';
import { getAuthorizationHeader } from '@/libs/auth';
import { useAuth } from '@/swr/client/auth';
import useSWRTimeline from '@/libs/swr/timeline';

const LIMIT = 20;

/**
 * ユーザー情報取得
 * @param username
 * @param fallbackData
 */
export const useUser = (username: string, fallbackData?: UserWithFollows) => {
  const { data: authId } = useAuth();
  return useSWR<UserWithFollows>(
    { key: 'useUser', username, authId },
    async () => {
      return await usersApi.getUserByUsername(
        { username },
        { headers: await getAuthorizationHeader(authId) },
      );
    },
    {
      fallbackData,
    },
  );
};

type TimelineKey = {
  key: string;
  userId: number;
  sinceId: string | null;
  maxId: string | null;
  authId?: number;
};

// タイムライン専用のキー生成関数
const getTimelineKey =
  (key: string, userId: number, authId?: number) =>
  (since: UserPost | null, max: UserPost | null): TimelineKey => {
    return {
      key: key,
      userId,
      sinceId: since?.id ?? null,
      maxId: max?.id ?? null,
      authId,
    };
  };

/**
 * ユーザーの投稿一覧取得
 * @param userId
 */
export const useUserPosts = (userId: number) => {
  const { data: authId } = useAuth();
  return useSWRTimeline<UserPost, Error, TimelineKey>(
    getTimelineKey('useUserPosts', userId, authId),
    async (key) => {
      const posts = await usersApi.getUserPosts(
        {
          id: key.userId,
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
    },
    {
      refreshInterval: 5000,
      enableQueue: true,
    },
  );
};
