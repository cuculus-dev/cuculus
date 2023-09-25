import useSWR from 'swr';
import { usersApi } from '@/api/cuculus-client';
import { UserResponse } from '@cuculus/cuculus-api';

const fetchMe = async () => {
  try {
    return await usersApi.getMe();
  } catch (error) {
    throw error;
  }
};

export const useProfile = () => {
  return useSWR<UserResponse | undefined, Error>({ url: 'getMe' }, fetchMe);
};
