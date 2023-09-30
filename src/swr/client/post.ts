import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import useSWRMutation from 'swr/mutation';

// FIXME 仮Post型 後で消えます。
export type PostData = {
  postId: number;
  text: string;
  favorited: boolean;
  favoriteCount: number;
  reposted: boolean;
  repostCount: number;
};

const fetcher = ({ postId }: { postId: number }): PostData => {
  return {
    postId,
    text: `ポストID:${postId}`,
    favorited: false,
    favoriteCount: 0,
    reposted: false,
    repostCount: 0,
  };
};

const update = (key: Key, { arg }: { arg: { postId: number } }): PostData => {
  // TODO Update処理
  return {
    postId: arg.postId,
    text: `ポストID:${arg.postId}`,
    favorited: true,
    favoriteCount: 0,
    reposted: true,
    repostCount: 0,
  };
};

type Key = {
  key: string;
  postId: number;
};

const getKey = (postId: number): Key => {
  return { key: `usePost:${postId}`, postId };
};

/**
 * ポスト取得
 * 自動検証されないので、一覧ページで使うのが望ましい
 * @param postId
 * @param initialData
 */
export const usePostImmutable = (postId: number, initialData?: PostData) => {
  return useSWRImmutable<PostData>(getKey(postId), fetcher, {
    fallbackData: initialData,
  });
};

export const usePostMutation = (postId: number) => {
  const { trigger } = useSWRMutation<PostData, Error, Key, { postId: number }>(
    getKey(postId),
    update,
    {
      populateCache: true,
      revalidate: false,
    },
  );
  const updatePost = async (postId: number) => {
    await trigger({ postId });
  };
  return { updatePost };
};

/**
 * ポスト取得
 * 自動再検証されるので、詳細ページで使うのが望ましい
 * @param postId
 */
export const usePost = (postId: number) => {
  return useSWR<PostData>(getKey(postId), fetcher);
};
