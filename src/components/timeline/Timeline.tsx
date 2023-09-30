'use client';

import { useTimeline } from '@/swr/client/timeline';
import TimelinePost from '@/components/timeline/organisms/TimelinePost';

/**
 * FIXME THIS IS MOCK
 * 再レンダリング起こすタイミングは要調整
 * @constructor
 */
export default function Timeline() {
  const { data } = useTimeline();
  return (
    <div>
      {data?.map((post) => {
        return (
          <TimelinePost
            key={post.postId}
            postId={post.postId}
            fallbackData={post}
          />
        );
      })}
    </div>
  );
}
