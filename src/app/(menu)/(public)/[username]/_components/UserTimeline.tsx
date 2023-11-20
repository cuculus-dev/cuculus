'use client';

import { UserWithFollows } from '@cuculus/cuculus-api';
import { useUserPosts } from '@/swr/client/user';
import { CircularProgress } from '@mui/material';
import { WVList } from 'virtua';
import TimelinePost from '@/app/(menu)/_components/timeline/TimelinePost';
import Showmore from '@/app/(menu)/_components/timeline/layouts/Showmore';
import { serializeGap } from '@/libs/swr/timeline/utils';

const Queue = ({ user }: { user: UserWithFollows }) => {
  const { queue, mutateLatest } = useUserPosts(user.id);

  return (
    queue &&
    queue.length > 0 && (
      <Showmore
        text={`最新の投稿があります。`}
        onClick={() => {
          void mutateLatest();
        }}
      />
    )
  );
};

export default function UserTimeline({ user }: { user: UserWithFollows }) {
  const { data, isLoading, mutateOlder, mutateGap } = useUserPosts(user.id);

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
        <Queue user={user} />
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
