import { useAuth } from '@/swr/client/auth';
import { usersApi } from '@/libs/cuculus-client';
import { getAuthorizationHeader } from '@/libs/auth';
import useSWRInfinite from 'swr/infinite';
import { FollowList } from '@cuculus/cuculus-api';

// FIXME 確認用に一旦10件にしている
const LIMIT = 10;

type SWRKey = {
  key: string;
  authId?: number;
  userId: number;
  nextUntil?: Date;
};

/**
 * フォロー一覧の取得
 * @param userId
 */
export const useFollowing = (userId: number) => {
  const { data: authId } = useAuth();
  return useSWRInfinite<
    FollowList | undefined,
    Error,
    (index: number, prev: FollowList | undefined) => SWRKey | null
  >(
    (index, previousPageData) => {
      // 取得結果が空の場合は次のページがないと判断して終了
      if (previousPageData && !previousPageData.users.length) {
        return null;
      }
      return {
        key: 'useFollowing',
        authId,
        userId,
        nextUntil: previousPageData?.nextUntil,
      };
    },
    async (args) => {
      try {
        return await usersApi.getUserFollowing(
          { id: args.userId, until: args.nextUntil, limit: LIMIT },
          {
            headers: await getAuthorizationHeader(authId),
          },
        );
      } catch (error) {
        throw error;
      }
    },
  );
};
