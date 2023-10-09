import useSWR from 'swr';
import { authMiddleware, usersApi, authApi } from '@/api/cuculus-client';
import {
  LoginRequest,
  PreUserRequest,
  ResponseError,
  UserResponse,
  VerifyCodeRequest,
} from '@cuculus/cuculus-api';
import { AuthJwtPayload, decodeToAuthJwtPayload } from '@/api/auth-middleware';
import useSWRMutation from 'swr/mutation';
import { UserRequest } from '@cuculus/cuculus-api/dist/models';

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
    if (authMiddleware.hasAccessToken()) {
      return await usersApi.getMe();
    }
    return undefined;
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

const preSignUp = async (
  key: string,
  { arg }: { arg: PreUserRequest },
): Promise<boolean> => {
  try {
    await authApi.postPreSignUp({ preUserRequest: arg });
    return true;
  } catch (error) {
    // エラー内容の分析
    if (error instanceof ResponseError) {
      if (error.response.status === 409) {
        throw new Error('既に登録されているメールアドレスです。');
      }
    }
  }
  throw new Error('サーバーとの通信に失敗しました。');
};

export const usePreSignUp = () => {
  return useSWRMutation<boolean, Error, string, PreUserRequest>(
    'postPreSignUp',
    preSignUp,
    {
      throwOnError: false,
    },
  );
};

const verifyCode = async (
  key: string,
  { arg }: { arg: VerifyCodeRequest },
): Promise<boolean> => {
  try {
    await authApi.postPreSignUpVerifyCode({ verifyCodeRequest: arg });
    return true;
  } catch (error) {
    // エラー内容の分析
    if (error instanceof ResponseError) {
      if (error.response.status === 400) {
        throw new Error('認証コードが違います。');
      }
      if (error.response.status === 403) {
        throw new Error('認証コードを規定回数以上間違えました。');
      }
      if (error.response.status === 404) {
        throw new Error(
          'ユーザーが見つかりませんでした。最初からやり直してください。',
        );
      }
    }
  }
  throw new Error('サーバーとの通信に失敗しました。');
};

export const useVerifyCode = () => {
  return useSWRMutation<boolean, Error, string, VerifyCodeRequest>(
    'postPreSignUpVerifyCode',
    verifyCode,
    {
      throwOnError: false,
    },
  );
};

const signUp = async (
  key: string,
  { arg }: { arg: UserRequest },
): Promise<AuthJwtPayload> => {
  try {
    const result = await authMiddleware.fetchSignUp(
      arg.username,
      arg.password,
      arg.code,
      arg.email,
      arg.invitationCode,
    );
    return decodeToAuthJwtPayload(result);
  } catch (error) {
    // エラー内容の分析
    if (error instanceof ResponseError) {
      if (error.response.status === 409) {
        throw new Error('既に登録されているユーザーIDです。');
      }
      if (error.response.status === 400) {
        throw new Error('不正なリクエストです。');
      }
    }
  }
  throw new Error('サーバーとの通信に失敗しました。');
};

/**
 * アカウント登録
 */
export const useSignUp = () => {
  return useSWRMutation<AuthJwtPayload, Error, typeof AUTH_KEY, UserRequest>(
    AUTH_KEY,
    signUp,
    {
      throwOnError: false,
      populateCache: (data) => data,
      revalidate: false,
    },
  );
};
