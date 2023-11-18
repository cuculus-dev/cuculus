'use client';

import TimelinePost from '@/features/timeline/TimelinePost';
import { useHomeTimeline } from '@/swr/client/timeline';
import { serializeGap } from '@/libs/swr/timeline/utils';
import { CircularProgress } from '@mui/material';
import { UserPost } from '@cuculus/cuculus-api';
import { TimelineData } from '@/libs/swr/timeline/types';
import Showmore from '@/features/timeline/layouts/Showmore';
import { WVList } from 'virtua';

// 投稿の件数をカウントする
const lengthPost = (data: TimelineData<UserPost>) => {
  return data.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc + cur.length;
    } else {
      return acc;
    }
  }, 0);
};

const Queue = () => {
  const { queue, mutateLatest } = useHomeTimeline();

  return (
    queue &&
    queue.length > 0 && (
      <Showmore
        text={`${lengthPost(queue)} 件のポストを表示`}
        onClick={() => {
          void mutateLatest();
        }}
      />
    )
  );
};

/**
 * 再レンダリング起こすタイミングは要調整
 * @constructor
 */
export default function Timeline() {
  const { data, isLoading, mutateOlder, mutateGap } = useHomeTimeline();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <WVList
        onRangeChange={(_, endIndex) => {
          const count =
            data?.reduce((accumulator, item) => {
              if (Array.isArray(item)) {
                return accumulator + item.length;
              }
              return accumulator + 1;
            }, 0) ?? 0;
          if (endIndex >= count) {
            void mutateOlder();
          }
        }}
      >
        <Queue />
        {data?.map((item) => {
          if (Array.isArray(item)) {
            return item.map((post) => {
              return (
                <TimelinePost
                  key={post.id}
                  postId={post.id}
                  fallbackData={post}
                />
              );
            });
          } else {
            return (
              <Showmore
                key={serializeGap(item)}
                onClick={() => {
                  void mutateGap(item);
                }}
                text="ポストを更に表示"
              />
            );
          }
        })}
      </WVList>
    </>
  );
}
