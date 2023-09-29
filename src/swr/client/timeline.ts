import useSWRInfinite from 'swr/infinite';
import { PostData } from '@/swr/client/post';

// FIXME Timeline型 後で消えます。
type TimelineData = PostData[];

type NextKey = {
  key: string;
  since?: number;
};

const getNextKey = (
  pageIndex: number,
  previousPageData: TimelineData | null,
): NextKey | null => {
  const previousPostId = previousPageData?.reduce(
    (maxId, post) => Math.max(maxId, post.postId),
    Infinity,
  );
  return { key: `next:${pageIndex}`, since: previousPostId }; // SWR キー
};

//
const nextFetcher = ({ key, since = 0 }: NextKey): TimelineData => {
  // TODO since以降のデータをfetchする想定
  const mockTimeline: TimelineData = [];
  const mockEnd = since + 10;
  for (let i = since + 1; i < mockEnd; i++) {
    const mockPost: PostData = {
      postId: i,
      text: `ポストID:${i} ${key}`,
      favorited: false,
      favoriteCount: 0,
      reposted: false,
      repostCount: 0,
    };
    mockTimeline.push(mockPost);
  }
  return mockTimeline;
};
//
type PreviousKey = {
  key: string;
  until?: number;
};

const getPreviousKey = (
  pageIndex: number,
  previousPageData: TimelineData | null,
): PreviousKey | null => {
  if (previousPageData && !previousPageData.length) return null; // 最後に到達した
  const previousPostId = previousPageData?.reduce(
    (minId, post) => Math.min(minId, post.postId),
    Infinity,
  );
  return { key: `previous:${pageIndex}`, until: previousPostId }; // SWR キー
};

const previousFetcher = ({ key, until = 0 }: PreviousKey): TimelineData => {
  // TODO until以前のデータをfetchする想定
  const mockTimeline: TimelineData = [];
  const mockEnd = until - 10;
  for (let i = until; i >= mockEnd; i--) {
    const mockPost: PostData = {
      postId: i,
      text: `ポストID:${i} ${key}`,
      favorited: false,
      favoriteCount: 0,
      reposted: false,
      repostCount: 0,
    };
    mockTimeline.push(mockPost);
  }
  return mockTimeline;
};

export const useTimelinePrevious = () => {
  return useSWRInfinite<TimelineData>(getPreviousKey, previousFetcher);
};
