import useSWRMutation from 'swr/mutation';
import { atProtocolApi } from '@/libs/cuculus-client';
import { useAuth } from '@/swr/client/auth';
import { ConnectAtProtocolRequest, ResponseError } from '@cuculus/cuculus-api';
import { getAuthorizationHeader } from '@/libs/auth';

/**
 * Blueskyアカウントと連携する
 */
export const useConnectBsky = () => {
  const { data: authId } = useAuth();
  const key = authId ? { key: 'useConnectBsky', authId } : null;
  return useSWRMutation<
    boolean,
    Error,
    { key: string; authId: number } | null,
    ConnectAtProtocolRequest
  >(
    key,
    async (_, { arg: request }) => {
      // header上書きで消えてるので手動で設定
      const headers = {
        ...(await getAuthorizationHeader(authId)),
        accept: 'application/json',
        'Content-Type': 'application/json',
      };
      try {
        await atProtocolApi.connectAtProtocol(request, { headers });
        return true;
      } catch (error) {
        if (error instanceof ResponseError) {
          if (error.response.status === 400) {
            const body = (await error.response.json()) as { message?: string };
            throw new Error(body.message ?? 'エラーが発生しました。');
          }
        }
        throw error;
      }
    },
    {
      throwOnError: false,
      revalidate: false,
    },
  );
};
