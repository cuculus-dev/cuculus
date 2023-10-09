import useSWRImmutable from 'swr/immutable';
import { defaultApi } from '@/api/cuculus-client';
import { SystemSettings } from '@cuculus/cuculus-api';

const fetcher = async () => {
  const systemSettings = await defaultApi.getSystemSettings();
  return systemSettings;
};

export const useSystem = () => {
  return useSWRImmutable<SystemSettings>(`getSystemSettings`, fetcher);
};
