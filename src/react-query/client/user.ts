import { usersApi } from '@/libs/cuculus-client';
import { UserWithFollows } from '@cuculus/cuculus-api';
import { getAuthorizationHeader } from '@/libs/auth';
import { useAuth } from '@/react-query/client/auth';
import { useQuery } from '@tanstack/react-query';

/**
 * ユーザー情報を取得する
 * @param username
 * @param initialData
 */
export const useUser = (username: string, initialData?: UserWithFollows) => {
  const { data: authId } = useAuth();
  return useQuery<UserWithFollows>({
    queryKey: ['useUser', username, authId],
    queryFn: async () => {
      console.debug(`[ReactQuery] useUser`);
      return await usersApi.getUserByUsername(
        { username },
        { headers: await getAuthorizationHeader(authId) },
      );
    },
    initialData,
    staleTime: 0,
  });
};
