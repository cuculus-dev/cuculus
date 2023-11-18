import useSWRImmutable from 'swr/immutable';
import { usersApi } from '@/libs/cuculus-client';
import { UserWithFollows } from '@cuculus/cuculus-api';
import { getAuthorizationHeader } from '@/libs/auth';
import { useAuth } from '@/swr/client/auth';

const fetcher = async ({
  username,
  authId,
}: {
  username: string;
  authId?: number;
}) => {
  return await usersApi.getUserByUsername(
    { username },
    { headers: await getAuthorizationHeader(authId) },
  );
};

export const useUserImmutable = (username: string) => {
  const { data: authId } = useAuth();
  return useSWRImmutable<UserWithFollows>(
    { key: 'getUserByUsername', username, authId },
    fetcher,
  );
};
