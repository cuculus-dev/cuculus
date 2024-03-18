import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  InvitationCodeRequest,
  ResponseError,
  UserInvitations,
} from '@cuculus/cuculus-api';
import { invitationsApi } from '@/libs/cuculus-client';
import { useAuth } from '@/react-query/client/auth';
import { getAuthorizationHeader } from '@/libs/auth';

/**
 * 招待コード検証
 * @param onSuccess
 */
export const useInvitationVerify = (
  onSuccess?: (result: boolean, request: InvitationCodeRequest) => void,
) => {
  return useMutation<boolean, Error, InvitationCodeRequest>({
    mutationFn: async (request) => {
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
    onSuccess,
  });
};

/**
 * 招待コード作成
 */
export const useInvitations = () => {
  const { data: authId } = useAuth();
  return useQuery<UserInvitations, Error>({
    queryKey: ['useInvitations', authId],
    queryFn: async () => {
      try {
        return await invitationsApi.getInvitationsMe({
          headers: await getAuthorizationHeader(authId),
        });
      } catch (error) {
        throw error;
      }
    },
    staleTime: 2000,
  });
};

/**
 * 招待コードを作成して一覧を再取得
 * @param onSuccess
 */
export const useInvitationCreate = (onSuccess?: () => void) => {
  const { data: authId } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<undefined, Error>({
    mutationFn: async () => {
      const headers = await getAuthorizationHeader(authId);
      await invitationsApi.postInvitationsCreate({ headers });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['useInvitations', authId],
      });
      onSuccess?.();
    },
  });
};
