import { mutate } from 'swr';
import { authApi } from '@/libs/cuculus-client';
import {
  LoginRequest,
  PreUserRequest,
  ResponseError,
  VerifyCodeRequest,
} from '@cuculus/cuculus-api';
import useSWRMutation from 'swr/mutation';
import { UserRequest } from '@cuculus/cuculus-api/dist/models';
import {
  decodeToAuthJwtPayload,
  fetchAccessToken,
  signIn,
  signOut,
  signUp,
} from '@/libs/auth';
import useSWRImmutable from 'swr/immutable';

// 前回取得したユーザーIDを保持
let USER_ID: number | undefined;

// 認証情報のキャッシュキー
const AUTH_KEY = 'useAuth';

/**
 * 認証情報を取得する
 */
export const useAuth = () => {
  return useSWRImmutable<number, Error>(
    AUTH_KEY,
    async () => {
      const token = await fetchAccessToken(USER_ID ?? undefined);
      if (token) {
        USER_ID = decodeToAuthJwtPayload(token).id;
        return USER_ID;
      } else {
        USER_ID = undefined;
        throw new Error('Unauthorized.');
      }
    },
    {
      errorRetryCount: 0,
    },
  );
};

/**
 * 事前登録処理
 */
export const usePreSignUp = () => {
  return useSWRMutation<boolean, Error, string, PreUserRequest>(
    'postPreSignUp',
    async (_, { arg: request }) => {
      try {
        await authApi.postPreSignUp({ preUserRequest: request });
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
    },
    {
      throwOnError: false,
    },
  );
};

/**
 * 認証コードの検証処理
 */
export const useVerifyCode = () => {
  return useSWRMutation<boolean, Error, string, VerifyCodeRequest>(
    'useVerifyCode',
    async (_, { arg: request }) => {
      try {
        await authApi.postPreSignUpVerifyCode({ verifyCodeRequest: request });
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
    },
    {
      throwOnError: false,
    },
  );
};

/**
 * アカウント登録処理
 */
export const useSignUp = () => {
  return useSWRMutation<number, Error, typeof AUTH_KEY, UserRequest>(
    AUTH_KEY,
    async (_, { arg: request }) => {
      try {
        const result = await signUp(
          request.username,
          request.password,
          request.code,
          request.email,
          request.invitationCode,
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
    },
    {
      throwOnError: false,
      populateCache: (data) => data,
      revalidate: false,
    },
  );
};

/**
 * ログイン処理
 */
export const useSignIn = () => {
  return useSWRMutation<number, Error, typeof AUTH_KEY, LoginRequest>(
    AUTH_KEY,
    async (_, { arg: request }) => {
      try {
        const result = await signIn(request.username, request.password);
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
    },
    {
      throwOnError: false,
      populateCache: (data) => data,
      revalidate: false,
    },
  );
};

/**
 * ログアウト処理
 */
export const useSignOut = () => {
  return useSWRMutation<void, Error, typeof AUTH_KEY, void>(
    AUTH_KEY,
    async () => {
      try {
        await signOut();
        await mutate(() => true, undefined, { revalidate: false });
        return;
      } catch {
        throw new Error('サーバーとの通信に失敗しました。');
      }
    },
    {
      throwOnError: false,
      populateCache: () => undefined,
      revalidate: false,
    },
  );
};
