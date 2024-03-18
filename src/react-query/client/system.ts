import { useQuery } from '@tanstack/react-query';
import { SystemSettings } from '@cuculus/cuculus-api';
import { defaultApi } from '@/libs/cuculus-client';

/**
 * システム設定を取得する
 */
export const useSystem = () => {
  return useQuery<SystemSettings>({
    queryKey: ['useSystem'],
    queryFn: async () => {
      return await defaultApi.getSystemSettings();
    },
    staleTime: 1000 * 60 * 5,
  });
};
