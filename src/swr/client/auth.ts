import useSWR from 'swr';
import { authMiddleware, usersApi } from '@/api/cuculus-client';
import {
  LoginRequest,
  ResponseError,
  UserResponse,
} from '@cuculus/cuculus-api';
import { AuthJwtPayload, decodeToAuthJwtPayload } from '@/api/auth-middleware';
import useSWRMutation from 'swr/mutation';

const AUTH_KEY = 'useAuth';

const fetchAuthenticated = async (): Promise<AuthJwtPayload> => {
  const token = await authMiddleware.fetchAccessToken('bearer');
  if (token) {
    return decodeToAuthJwtPayload(token);
  } else {
    throw new Error('Unauthorized.');
  }
};

/**
 * ログイン状態のみを返す。
 */
export const useAuth = () => {
  return useSWR<AuthJwtPayload, Error>(AUTH_KEY, fetchAuthenticated);
};

const signIn = async (
  key: string,
  { arg }: { arg: LoginRequest },
): Promise<AuthJwtPayload> => {
  try {
    const result = await authMiddleware.fetchSignIn(arg.username, arg.password);
    return decodeToAuthJwtPayload(result);
  } catch (error) {
    // エラー内容の分析
    if (error instanceof ResponseError) {
      if (error.response.status === 400) {
        throw new Error('ユーザー名またはパスワードが間違っています。');
      }
    }
  }
  throw new Error('サーバーとの通信に失敗しました。');
};

/**
 * ログイン処理
 */
export const useSignIn = () => {
  return useSWRMutation<AuthJwtPayload, Error, typeof AUTH_KEY, LoginRequest>(
    AUTH_KEY,
    signIn,
    {
      throwOnError: false,
      populateCache: (data) => data,
      revalidate: false,
    },
  );
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
