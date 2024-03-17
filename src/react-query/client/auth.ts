import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  decodeToAuthJwtPayload,
  fetchAccessToken,
  signIn,
  signOut,
  signUp,
} from '@/libs/auth';
import {
  LoginRequest,
  PreUserRequest,
  ResponseError,
  VerifyCodeRequest,
} from '@cuculus/cuculus-api';
import { authApi } from '@/libs/cuculus-client';
import { UserRequest } from '@cuculus/cuculus-api/dist/models';

// 認証情報のキャッシュキー
const AUTH_KEY = ['useAuth'];

// 前回取得したユーザーIDを保持
let USER_ID: number | undefined;

/**
 * 認証情報を取得する
 */
export const useAuth = () => {
  return useQuery<number>({
    queryKey: AUTH_KEY,
    queryFn: async () => {
      console.debug(`[ReactQuery] useAuth`);
      const token = await fetchAccessToken(USER_ID ?? undefined);
      if (token) {
        USER_ID = decodeToAuthJwtPayload(token).id;
        return USER_ID;
      } else {
        USER_ID = undefined;
        throw new Error('Unauthorized.');
      }
    },
    retry: false,
    // エラーが発生している場合は再取得を無効にする
    refetchOnWindowFocus: (query) => query.state.status !== 'error',
  });
};

/**
 * 事前登録処理
 * @param onSuccess
 */
export const usePreSignUp = (
  onSuccess?: (result: boolean, request: PreUserRequest) => void,
) => {
  return useMutation<boolean, Error, PreUserRequest>({
    mutationFn: async (request) => {
      console.debug(`[ReactQuery] usePreSignUp`);
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
    onSuccess,
  });
};

/**
 * 認証コードの検証処理
 * @param onSuccess
 */
export const useVerifyCode = (
  onSuccess?: (result: boolean, request: VerifyCodeRequest) => void,
) => {
  return useMutation<boolean, Error, VerifyCodeRequest>({
    mutationFn: async (request) => {
      console.debug(`[ReactQuery] useVerifyCode`);
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
    onSuccess,
  });
};

/**
 * アカウント登録処理
 * @param onSuccess
 */
export const useSignUp = (
  onSuccess?: (result: number, request: UserRequest) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation<number, Error, UserRequest>({
    mutationFn: async ({ username, password, code, email, invitationCode }) => {
      console.debug(`[ReactQuery] useSignUp`);
      try {
        const result = await signUp(
          username,
          password,
          code,
          email,
          invitationCode,
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
    onSuccess: (result, request) => {
      USER_ID = result;
      queryClient.setQueryData<number>(AUTH_KEY, result);
      onSuccess?.(result, request);
    },
  });
};

/**
 * ログイン処理
 * @param onSuccess
 */
export const useSignIn = (onSuccess?: (result: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation<number, Error, LoginRequest>({
    mutationFn: async ({ username, password }) => {
      console.debug(`[ReactQuery] useSignIn`);
      try {
        const result = await signIn(username, password);
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
    onSuccess: (result) => {
      USER_ID = result;
      queryClient.setQueryData<number>(AUTH_KEY, result);
      onSuccess?.(result);
    },
  });
};

/**
 * ログアウト処理
 * @param onSuccess
 */
export const useSignOut = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: async () => {
      console.debug(`[ReactQuery] useSignOut`);
      try {
        await signOut();
      } catch {
        throw new Error('サーバーとの通信に失敗しました。');
      }
    },
    onSuccess: async () => {
      USER_ID = undefined;
      await queryClient.resetQueries({ queryKey: AUTH_KEY });
      onSuccess?.();
    },
  });
};
