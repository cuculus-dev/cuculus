import useSWR from 'swr';
import { PostData } from '@/swr/client/post';

// FIXME Timeline型 後で消えます。
type TimelineData = PostData[];

const fetcher = (): TimelineData => {
  const mockTimeline: TimelineData = [];
  for (let i = 0; i < 20; i++) {
    const mockPost: PostData = {
      postId: i,
      text: `ポストID:${i}`,
      favorited: false,
      favoriteCount: 0,
      reposted: false,
      repostCount: 0,
    };
    mockTimeline.push(mockPost);
  }
  return mockTimeline;
};

export const useTimeline = () => {
  return useSWR<TimelineData>({ key: `useTimeline:` }, fetcher);
};
