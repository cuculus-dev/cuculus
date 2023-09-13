import useSWR from 'swr';

// FIXME 仮Post型
type Post = {
  postId: number;
  favorited: boolean;
  favoriteCount: number;
  reposted: boolean;
  repostCount: number;
};

const fetcher = ({ postId }: { postId: number }) => {
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
