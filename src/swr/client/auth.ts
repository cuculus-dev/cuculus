import useSWR from 'swr';
import { authMiddleware, usersApi } from '@/api/cuculus-client';
import { LoginRequest, UserResponse } from '@cuculus/cuculus-api';
import useSWRMutation from 'swr/mutation';

const fetchAuthenticated = async (): Promise<boolean> => {
  const token = await authMiddleware.fetchAccessToken('bearer');
  // ちゃんと更新できている場合
  if (token) {
    // TODO JWTの期限見て判別可能。オフラインで更新に失敗してることも有り
    return true;
  } else {
    // セッション切れ
    return false;
  }
};

/**
 * ログイン状態のみを返す。
 * TODO 後々booleanではなくuser_idを入れたPayloadを返却するようになる
 */
export const useAuth = () => {
  return useSWR<boolean, Error>(
    { url: 'postTokenRefresh' },
    fetchAuthenticated,
  );
};

/**
 * ログイン処理
 */
export const useLogin = () => {
  const { mutate } = useAuth();
  const login = async (url: string, { arg }: { arg: LoginRequest }) => {
    try {
      await authMiddleware.fetchSignIn(arg.username, arg.password);
      await mutate(true, false);
    } catch (error) {
      throw error;
    }
  };

  return useSWRMutation<void, Error, string, LoginRequest>('postLogin', login);
};

const fetchMe = async () => {
  try {
    return await usersApi.getMe();
  } catch (error) {
    throw error;
  }
};

/**
 * 自身の情報を取得する
 */
export const useProfile = () => {
  return useSWR<UserResponse | undefined, Error>({ url: 'getMe' }, fetchMe);
};
