import useSWR from 'swr';

// FIXME 仮Post型
type Post = {
  postId: number;
  favorited: boolean;
  favoriteCount: number;
  reposted: boolean;
  repostCount: number;
};

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const fetcher = async ({ postId }: { postId: number }) => {
  //FIXME 1秒待機
  await wait(1000);
  return {
    postId,
    favorited: false,
    favoriteCount: 0,
    reposted: false,
    repostCount: 0,
  };
};

const usePost = (postId: number) => {
  return useSWR<Post>({ key: `usePost:${postId}`, postId }, fetcher);
};

export default usePost;
