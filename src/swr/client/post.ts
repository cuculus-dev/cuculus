import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { postsApi } from '@/libs/cuculus-client';
import { CreatePostRequest, UserPost } from '@cuculus/cuculus-api';
import { useAuth } from '@/swr/client/auth';
import { getAuthorizationHeader } from '@/libs/auth';

/**
 * ポスト取得
 * 自動再検証されるので、詳細ページで使うのが望ましい
 * @param postId
 * @param initialData
 */
export const usePost = (postId: string, initialData?: UserPost) => {
  const { data: authId } = useAuth();
  return useSWR<UserPost>(
    { key: 'usePost', postId, authId },
    async () => {
      return await postsApi.getPost(
        { id: postId },
        {
          headers: await getAuthorizationHeader(authId),
        },
      );
    },
    {
      fallbackData: initialData,
    },
  );
};

type SendKey = {
  key: string;
  authId: number;
};

/**
 * 投稿作成
 */
export const usePostCreate = () => {
  const { data: authId } = useAuth();
  const key = authId ? { key: 'usePostCreate', authId } : null;
  return useSWRMutation<UserPost, Error, SendKey | null, CreatePostRequest>(
    key,
    async (_, { arg: request }) => {
      // header上書きで消えてるので手動で設定
      const headers = {
        ...(await getAuthorizationHeader(authId)),
        accept: 'application/json',
        'Content-Type': 'application/json',
      };
      return await postsApi.createPost(request, { headers });
    },
  );
};

type Key = {
  key: string;
  postId: string;
  authId?: number;
};

/**
 * 投稿をお気に入りに追加/削除
 * @param postId
 */
export const useFavoriteUpdate = (postId: string) => {
  const { data: authId } = useAuth();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const swrKey = authId ? { key: 'usePost', postId, authId } : null;
  return useSWRMutation<UserPost, Error, Key | null, boolean>(
    swrKey,
    async (_, { arg: value }) => {
      const headers = await getAuthorizationHeader(authId);
      if (value) {
        return await postsApi.createFavorite({ id: postId }, { headers });
      } else {
        return await postsApi.deleteFavorite({ id: postId }, { headers });
      }
    },
    {
      populateCache: true,
      revalidate: false,
    },
  );
};

/**
 * 投稿をリポストする
 * @param postId
 */
export const useRepostCreate = (postId: string) => {
  const { data: authId } = useAuth();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const swrKey = authId ? { key: 'usePost', postId, authId } : null;
  return useSWRMutation<UserPost>(
    swrKey,
    async () => {
      const headers = await getAuthorizationHeader(authId);
      return await postsApi.createRepost({ id: postId }, { headers });
    },
    {
      revalidate: true,
    },
  );
};
