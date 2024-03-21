import { Relationship } from '@cuculus/cuculus-api';
import { useAuth } from '@/swr/client/auth';
import useSWR from 'swr';
import { usersApi } from '@/libs/cuculus-client';
import { getAuthorizationHeader } from '@/libs/auth';

// ユーザーとの関係性を取得するためのキー型
export type RelationshipKey = {
  key: 'useRelationship';
  userId: number;
  authId?: number;
};

/**
 * ユーザーとの関係性を取得する
 * @param userId
 */
export const useRelationship = (userId: number) => {
  const { data: authId } = useAuth();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const key = authId
    ? { key: 'useRelationship' as const, userId, authId }
    : null;
  return useSWR<Relationship, Error, RelationshipKey | null>(
    key,
    async () => {
      return await usersApi.getRelationShip(
        { id: userId },
        { headers: await getAuthorizationHeader(authId) },
      );
    },
    {},
  );
};
