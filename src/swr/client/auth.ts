import useSWR from 'swr';
import { usersApi } from '@/libs/cuculus-client';
import { User } from '@cuculus/cuculus-api';
import { getAuthorizationHeader } from '@/libs/auth';
import { useAuth } from '@/react-query/client/auth';

const fetchMe = async ({ authId }: { authId: number }) => {
  try {
    return await usersApi.getMe({
      headers: await getAuthorizationHeader(authId),
    });
  } catch (error) {
    throw error;
  }
};

/**
 * 自身の情報を取得する
 */
export const useProfile = () => {
  const { data: authId } = useAuth();
  const swrKey = authId ? { key: 'useProfile', authId } : null;
  return useSWR<User | undefined, Error>(swrKey, fetchMe, undefined);
};
