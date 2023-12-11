import { getAuthorizationHeader } from '@/libs/auth';
import { accountsApi } from '@/libs/cuculus-client';
import { useAuth } from '@/swr/client/auth';
import useSWRMutation from 'swr/mutation';
import { UserWithFollows } from '@cuculus/cuculus-api/dist/models';

type SWRKey = {
  key: string;
  authId: number;
};

type Arg = {
  name?: string;
  bio?: string;
  profileImage?: Blob;
};

const update = async (
  key: SWRKey,
  { arg }: { arg: Arg },
): Promise<UserWithFollows> => {
  const headers = {
    ...(await getAuthorizationHeader(key.authId)),
    // 'Content-Type': 'application/json',
  };

  let user: UserWithFollows | undefined = undefined;

  if (arg.profileImage) {
    user = await accountsApi.updateProfileImage(
      { file: arg.profileImage },
      { headers },
    );
  }
  if (arg.bio || arg.name) {
    // TODO SDKの更新待ち
    user = await accountsApi.updateProfile(
      {
        updateProfile: { name: arg.name, bio: arg.bio as unknown as object },
      },
      { headers },
    );
  }
  if (user) {
    return user;
  } else {
    throw new Error('更新に失敗しました。');
  }
};

export const useProfileMutation = () => {
  const { data: authId } = useAuth();
  const key = authId ? { key: 'useProfile', authId } : null;
  return useSWRMutation<UserWithFollows, Error, SWRKey | null, Arg>(
    key,
    update,
  );
};
