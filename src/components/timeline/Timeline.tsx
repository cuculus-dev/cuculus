'use client';

import { useTimelinePrevious } from '@/swr/client/timeline';
import TimelinePost from '@/components/timeline/organisms/TimelinePost';

/**
 * FIXME THIS IS MOCK
 * さらに読み込む度に既存コンポーネントにも再レンダリングが走るので要調整
 * @constructor
 */
export default function Timeline() {
  const { data, setSize, size } = useTimelinePrevious();
  return (
    <div>
      {data?.map((posts) => {
        return posts.map((post) => {
          return (
            <TimelinePost
              key={post.postId}
              postId={post.postId}
              fallbackData={post}
            />
          );
        });
      })}
      <button onClick={() => void setSize(size + 1)}>さらに読み込む</button>
    </div>
  );
}
