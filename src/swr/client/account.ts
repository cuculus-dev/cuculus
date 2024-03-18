import { accountsApi, usersApi } from '@/libs/cuculus-client';
import { getAuthorizationHeader } from '@/libs/auth';
import useSWR from 'swr';
import { User } from '@cuculus/cuculus-api';
import { useAuth } from '@/swr/client/auth';
import { UserWithFollows } from '@cuculus/cuculus-api/dist/models';
import useSWRMutation from 'swr/mutation';

type SWRKey = {
  key: string;
  authId: number;
};

type UpdateRequest = {
  name?: string;
  bio?: string;
  profileImage?: Blob;
};

/**
 * 自身の情報を取得する
 */
export const useProfile = () => {
  const { data: authId } = useAuth();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const swrKey = authId ? { key: 'useProfile', authId } : null;
  return useSWR<User | undefined, Error>(swrKey, async () => {
    try {
      return await usersApi.getMe({
        headers: await getAuthorizationHeader(authId),
      });
    } catch (error) {
      throw error;
    }
  });
};

/**
 * プロフィール更新とプロフィール情報再取得
 */
export const useProfileUpdate = () => {
  const { data: authId } = useAuth();
  const { mutate } = useProfile();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const key = authId ? { key: 'useProfile', authId } : null;
  return useSWRMutation<UserWithFollows, Error, SWRKey | null, UpdateRequest>(
    key,
    async (_, { arg: request }) => {
      const headers = await getAuthorizationHeader(authId);

      let user: UserWithFollows | undefined = undefined;

      if (request.bio != undefined || request.name) {
        user = await accountsApi.updateProfile(
          {
            updateProfile: { name: request.name, bio: request.bio },
          },
          {
            headers: {
              ...headers,
              'Content-Type': 'application/json',
            },
          },
        );
      }
      if (request.profileImage) {
        user = await accountsApi.updateProfileImage(
          { file: request.profileImage },
          { headers },
        );
      }
      if (user) {
        return user;
      } else {
        throw new Error('更新に失敗しました。');
      }
    },
    {
      onSuccess: async () => {
        await mutate();
      },
    },
  );
};
