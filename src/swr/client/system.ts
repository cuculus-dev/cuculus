import useSWRImmutable from 'swr/immutable';
import { defaultApi } from '@/libs/cuculus-client';
import { SystemSettings } from '@cuculus/cuculus-api';

const fetcher = async () => {
  return await defaultApi.getSystemSettings();
};

export const useSystem = () => {
  return useSWRImmutable<SystemSettings>(`getSystemSettings`, fetcher);
};
