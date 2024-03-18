import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserWithFollows } from '@cuculus/cuculus-api/dist/models';
import { useAuth } from '@/react-query/client/auth';
import { getAuthorizationHeader } from '@/libs/auth';
import { accountsApi, usersApi } from '@/libs/cuculus-client';

/**
 * 自身の情報を取得する
 */
export const useProfile = () => {
  const { data: authId } = useAuth();
  return useQuery<UserWithFollows>({
    queryKey: ['useProfile', authId],
    queryFn: async () => {
      console.debug(`[ReactQuery] useProfile`);
      try {
        return await usersApi.getMe({
          headers: await getAuthorizationHeader(authId),
        });
      } catch (error) {
        throw error;
      }
    },
    staleTime: 2000,
  });
};

type UpdateProfile = {
  name?: string;
  bio?: string;
  profileImage?: Blob;
};

/**
 * プロフィール更新とプロフィール情報再取得
 * @param onSuccess
 * @param onError
 */
export const useProfileUpdate = (
  onSuccess?: () => void,
  onError?: () => void,
) => {
  const { data: authId } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<UserWithFollows, Error, UpdateProfile>({
    mutationFn: async ({ name, bio, profileImage }) => {
      const headers = await getAuthorizationHeader(authId);
      let user: UserWithFollows | undefined = undefined;
      if (bio != undefined || name) {
        user = await accountsApi.updateProfile(
          {
            updateProfile: { name, bio },
          },
          {
            headers: {
              ...headers,
              'Content-Type': 'application/json',
            },
          },
        );
      }
      if (profileImage) {
        user = await accountsApi.updateProfileImage(
          { file: profileImage },
          { headers },
        );
      }
      if (user) {
        return user;
      } else {
        throw new Error('更新に失敗しました。');
      }
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['useProfile', authId] });
      onSuccess?.();
    },
    onError,
  });
};
