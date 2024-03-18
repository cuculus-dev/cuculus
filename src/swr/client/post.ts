import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { postsApi } from '@/libs/cuculus-client';
import { CreatePostRequest, UserPost } from '@cuculus/cuculus-api';
import { useAuth } from '@/swr/client/auth';
import { getAuthorizationHeader } from '@/libs/auth';

type Key = {
  key: string;
  postId: string;
  authId?: number;
};

type UpdateRequest = {
  favorited?: boolean;
  reposted?: boolean;
};

const update = async (
  key: Key,
  { arg }: { arg: UpdateRequest },
): Promise<UserPost> => {
  let userPost: UserPost | undefined = undefined;
  if (key.authId === undefined) {
    throw new Error('未ログイン状態です。');
  }
  const headers = await getAuthorizationHeader(key.authId);
  if (arg.favorited !== undefined) {
    if (arg.favorited) {
      userPost = await postsApi.createFavorite({ id: key.postId }, { headers });
    } else {
      userPost = await postsApi.deleteFavorite({ id: key.postId }, { headers });
    }
  }
  if (arg.reposted !== undefined) {
    if (arg.reposted) {
      userPost = await postsApi.createRepost({ id: key.postId }, { headers });
    } else {
      // FIXME 一旦通るようにしただけなのでエラーになります。
      await postsApi.deletePost({ id: key.postId }, { headers });
    }
  }
  // どちらでもない場合
  if (!userPost) {
    throw new Error('不正なリクエスト');
  }
  return userPost;
};

/**
 * 投稿に対するアクション
 * ※非ログイン状態だと使えません。
 * @param postId
 */
export const usePostMutation = (postId: string) => {
  const { data: authId } = useAuth();
  // 非ログイン時はキー値にnullを渡して実行させないようにする
  const swrKey = authId ? { key: 'usePost', postId, authId } : null;
  return useSWRMutation<UserPost, Error, Key | null, UpdateRequest>(
    swrKey,
    update,
    {
      populateCache: true,
      revalidate: false,
    },
  );
};

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
