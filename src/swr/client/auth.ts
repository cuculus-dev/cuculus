import useSWR, { mutate } from 'swr';
import { usersApi, authApi } from '@/libs/cuculus-client';
import {
  LoginRequest,
  PreUserRequest,
  ResponseError,
  User,
  VerifyCodeRequest,
} from '@cuculus/cuculus-api';
import useSWRMutation from 'swr/mutation';
import { UserRequest } from '@cuculus/cuculus-api/dist/models';
import {
  decodeToAuthJwtPayload,
  fetchAccessToken,
  getAuthorizationHeader,
  signIn,
  signOut,
  signUp,
} from '@/libs/auth';

const AUTH_KEY = 'useAuth';

const fetchAuthenticated = async (): Promise<number> => {
  const token = await fetchAccessToken();
  if (token) {
    return decodeToAuthJwtPayload(token).id;
  } else {
    throw new Error('Unauthorized.');
  }
};

/**
 * ログイン状態のみを返す。
 */
export const useAuth = () => {
  return useSWR<number, Error>(AUTH_KEY, fetchAuthenticated, {
    errorRetryCount: 0,
  });
};

const fetchSignIn = async (
  _key: string,
  { arg }: { arg: LoginRequest },
): Promise<number> => {
  try {
    const result = await signIn(arg.username, arg.password);
    return result.id;
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
  return useSWRMutation<number, Error, typeof AUTH_KEY, LoginRequest>(
    AUTH_KEY,
    fetchSignIn,
    {
      throwOnError: false,
      populateCache: (data) => data,
      revalidate: false,
    },
  );
};

const fetchMe = async ({ authId }: { authId: number }) => {
  try {
    return await usersApi.getMe({
      headers: await getAuthorizationHeader(authId),
    });
  } catch (error) {
    throw error;
  }
};

/**
 * 自身の情報を取得する
 */
export const useProfile = () => {
  const { data: authId } = useAuth();
  const swrKey = authId ? { key: 'useProfile', authId } : null;
  return useSWR<User | undefined, Error>(swrKey, fetchMe);
};

const fetchPreSignUp = async (
  _key: string,
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
    fetchPreSignUp,
    {
      throwOnError: false,
    },
  );
};

const verifyCode = async (
  _key: string,
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

const fetchSignUp = async (
  _key: string,
  { arg }: { arg: UserRequest },
): Promise<number> => {
  try {
    const result = await signUp(
      arg.username,
      arg.password,
      arg.code,
      arg.email,
      arg.invitationCode,
    );
    return result.id;
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
  return useSWRMutation<number, Error, typeof AUTH_KEY, UserRequest>(
    AUTH_KEY,
    fetchSignUp,
    {
      throwOnError: false,
      populateCache: (data) => data,
      revalidate: false,
    },
  );
};

const fetchSignOut = async () => {
  try {
    await signOut();
    await mutate(() => true, undefined, { revalidate: false });
    return;
  } catch {
    throw new Error('サーバーとの通信に失敗しました。');
  }
};

/**
 * ログアウト処理
 */
export const useSignOut = () => {
  return useSWRMutation<void, Error, typeof AUTH_KEY, void>(
    AUTH_KEY,
    fetchSignOut,
    {
      throwOnError: false,
      populateCache: () => undefined,
      revalidate: false,
    },
  );
};
