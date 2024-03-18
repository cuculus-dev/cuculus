import { invitationsApi } from '@/libs/cuculus-client';
import {
  InvitationCodeRequest,
  ResponseError,
  UserInvitations,
} from '@cuculus/cuculus-api';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { useAuth } from '@/swr/client/auth';
import { getAuthorizationHeader } from '@/libs/auth';
import { Invitation } from '@cuculus/cuculus-api/dist/models/Invitation';

/**
 * 招待コード検証
 */
export const useInvitationVerify = () => {
  return useSWRMutation<boolean, Error, string, InvitationCodeRequest>(
    `useInvitationVerify`,
    async (_, { arg: request }) => {
      try {
        await invitationsApi.postInvitationVerifyCode({
          invitationCodeRequest: request,
        });
        return true;
      } catch (error) {
        if (error instanceof ResponseError) {
          if (error.response.status === 400) {
            throw new Error('招待コードが無効です。');
          }
        }
      }
      throw new Error('サーバーとの通信に失敗しました。');
    },
    { throwOnError: false },
  );
};

/**
 * 招待コード一覧
 */
export const useInvitations = () => {
  const { data: authId } = useAuth();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const swrKey = authId ? { key: 'useInvitations', authId } : null;
  return useSWR<UserInvitations | undefined, Error>(
    swrKey,
    async () => {
      try {
        return await invitationsApi.getInvitationsMe({
          headers: await getAuthorizationHeader(authId),
        });
      } catch (error) {
        throw error;
      }
    },
    undefined,
  );
};

type Key = { key: string; authId: number };

/**
 * 招待コードを作成して一覧を再取得
 */
export const useInvitationCreate = () => {
  const { data: authId } = useAuth();
  const { mutate } = useInvitations();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const swrKey = authId ? { key: 'useInvitationCreate', authId } : null;
  return useSWRMutation<Invitation | undefined, Error, Key | null>(
    swrKey,
    async () => {
      const headers = await getAuthorizationHeader(authId);
      return await invitationsApi.postInvitationsCreate({ headers });
    },
    {
      onSuccess: () => {
        void mutate();
      },
    },
  );
};
