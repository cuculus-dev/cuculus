'use client';

import TimelinePost from '@/features/timeline/TimelinePost';
import { useHomeQueue, useHomeTimeline } from '@/swr/client/timeline';
import { serializeGap } from '@/libs/swr/timeline/serialize';
import { CircularProgress } from '@mui/material';
import { useEffect, useRef } from 'react';
import { UserPost } from '@cuculus/cuculus-api';
import { Timeline as Result } from '@/libs/swr/timeline/types';
import Showmore from '@/features/timeline/layouts/Showmore';

const Queue = ({
  data,
  setLatest,
}: {
  data: Result<UserPost>;
  setLatest: (queue: Result<UserPost>) => void;
}) => {
  const { data: queue, reset } = useHomeQueue();
  const prevLatest = useRef<UserPost | undefined>(undefined);

  // キューをリセット
  useEffect(() => {
    if (data) {
      const find = data.find((item) => Array.isArray(item)) as
        | UserPost[]
        | undefined;
      if (find && find.length > 0) {
        if (!prevLatest.current || find[0]?.id !== prevLatest.current.id) {
          void reset(find[0]);
        }
      }
    }
  }, [data, reset]);

  return (
    queue &&
    queue.length > 0 && (
      <Showmore
        text={`${queue.length} 件のポストを表示`}
        onClick={() => {
          if (queue) {
            setLatest(queue);
          }
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
  const { data, mutateLatest, mutateGap, mutateOlder, isLoading } =
    useHomeTimeline();

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
    <div>
      {data && (
        <Queue
          data={data}
          setLatest={(queue) => {
            void mutateLatest(queue);
          }}
        />
      )}
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
      <Showmore
        text={'もっと見る'}
        onClick={() => {
          void mutateOlder();
        }}
      />
    </div>
  );
}
