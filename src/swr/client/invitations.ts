import { invitationsApi } from '@/api/cuculus-client';
import { InvitationCodeRequest, ResponseError } from '@cuculus/cuculus-api';
import useSWRMutation from 'swr/mutation';

const postVerifyCode = async (
  key: string,
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
