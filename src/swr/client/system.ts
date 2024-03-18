import useSWRImmutable from 'swr/immutable';
import { defaultApi } from '@/libs/cuculus-client';
import { SystemSettings } from '@cuculus/cuculus-api';

/**
 * システム設定を取得する
 */
export const useSystem = () => {
  return useSWRImmutable<SystemSettings>(`useSystem`, async () => {
    return await defaultApi.getSystemSettings();
  });
};
