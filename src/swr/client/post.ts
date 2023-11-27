import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
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

const getKey = (postId: string, authId?: number): Key => {
  return { key: 'usePost', postId, authId };
};

const fetcher = async ({ postId, authId }: Key): Promise<UserPost> => {
  return await postsApi.getPost(
    { id: postId },
    {
      headers: await getAuthorizationHeader(authId),
    },
  );
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
      userPost = await postsApi.deleteRepost({ id: key.postId }, { headers });
    }
  }
  // どちらでもない場合
  if (!userPost) {
    throw new Error('不正なリクエスト');
  }
  return userPost;
};

/**
 * ポスト取得
 * 自動検証されないので、一覧ページで使うのが望ましい
 * @param postId
 * @param initialData
 */
export const usePostImmutable = (postId: string, initialData?: UserPost) => {
  const { data: authId } = useAuth();
  return useSWRImmutable<UserPost>(getKey(postId, authId), fetcher, {
    fallbackData: initialData,
  });
};

/**
 * 投稿に対するアクション
 * ※非ログイン状態だと使えません。
 * @param postId
 */
export const usePostMutation = (postId: string) => {
  const { data: authId } = useAuth();
  const swrKey = authId ? getKey(postId, authId) : null;
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
 */
export const usePost = (postId: string) => {
  const { data: authId } = useAuth();
  return useSWR<UserPost>(getKey(postId, authId), fetcher);
};

type SendKey = {
  key: string;
  authId: number;
};

const send = async (
  key: SendKey,
  { arg }: { arg: CreatePostRequest },
): Promise<UserPost> => {
  // FIXME header上書きで消えてるので手動で設定
  const headers = {
    ...(await getAuthorizationHeader(key.authId)),
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return await postsApi.createPost(arg, { headers });
};

export const usePostSend = () => {
  const { data: authId } = useAuth();
  const key = authId ? { key: 'usePostSend', authId } : null;
  return useSWRMutation<UserPost, Error, SendKey | null, CreatePostRequest>(
    key,
    send,
  );
};
