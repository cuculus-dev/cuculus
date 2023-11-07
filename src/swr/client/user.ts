import useSWRImmutable from 'swr/immutable';
import { usersApi } from '@/libs/cuculus-client';
import { UserWithFollows } from '@cuculus/cuculus-api';

const fetcher = async ({ username }: { username: string }) => {
  return await usersApi.getUserByUsername({ username });
};

export const useUserImmutable = (username: string) => {
  return useSWRImmutable<UserWithFollows>(
    { key: 'getUserByUsername', username },
    fetcher,
  );
};
