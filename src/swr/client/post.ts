import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import useSWRMutation from 'swr/mutation';
import { postsApi } from '@/libs/cuculus-client';
import { UserPost } from '@cuculus/cuculus-api';

type Key = {
  key: string;
  postId: string;
};

const getKey = (postId: string): Key => {
  return { key: 'usePost', postId };
};

const fetcher = async ({ postId }: { postId: string }): Promise<UserPost> => {
  return await postsApi.getPost({ id: postId });
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
  if (arg.favorited !== undefined) {
    if (arg.favorited) {
      userPost = await postsApi.createFavorite({ id: key.postId });
    } else {
      userPost = await postsApi.deleteFavorite({ id: key.postId });
    }
  }
  if (arg.reposted !== undefined) {
    if (arg.reposted) {
      userPost = await postsApi.createRepost({ id: key.postId });
    } else {
      userPost = await postsApi.deleteRepost({ id: key.postId });
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
  return useSWRImmutable<UserPost>(getKey(postId), fetcher, {
    fallbackData: initialData,
  });
};

export const usePostMutation = (postId: string) => {
  return useSWRMutation<UserPost, Error, Key, UpdateRequest>(
    getKey(postId),
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
  return useSWR<UserPost>(getKey(postId), fetcher);
};
