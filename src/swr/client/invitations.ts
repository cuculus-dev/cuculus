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

const postVerifyCode = async (
  _key: string,
  { arg }: { arg: InvitationCodeRequest },
) => {
  try {
    await invitationsApi.postInvitationVerifyCode({
      invitationCodeRequest: arg,
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
};

export const useInvitationVerify = () => {
  return useSWRMutation<boolean, Error, string, InvitationCodeRequest>(
    `postInvitationVerifyCode`,
    postVerifyCode,
    { throwOnError: false },
  );
};

const fetcher = async ({
  authId,
}: {
  authId: number;
}): Promise<UserInvitations> => {
  try {
    return await invitationsApi.getInvitationsMe({
      headers: await getAuthorizationHeader(authId),
    });
  } catch (error) {
    throw error;
  }
};

export const useInvitations = () => {
  const { data: authId } = useAuth();
  const swrKey = authId ? { key: 'useInvitations', authId } : null;
  return useSWR<UserInvitations | undefined, Error>(swrKey, fetcher);
};
