'use client';

import { usePostImmutable } from '@/swr/client/post';
import ViewTrigger from '@/features/timeline/ViewportTrigger';
import Post from '@/features/timeline/layouts/Post';
import { UserPost } from '@cuculus/cuculus-api';

/**
 * タイムライン表示用のPostコンポーネント
 * 画面内に表示されている場合、5秒毎に更新がないか検証する
 * @param postId
 * @param fallbackData
 * @constructor
 */
function TimelinePost({
  postId,
  fallbackData,
}: {
  postId: string;
  fallbackData: UserPost;
}) {
  // FIXME 自動mutate一旦OFF
  const { data, mutate } = usePostImmutable(postId, fallbackData);

  return data ? (
    <ViewTrigger
      onInView={() => {
        /**/
      }}
      interval={5}
    >
      <Post
        displayName={data.author.name}
        userName={data.author.username}
        profileImageUrl={data.author.profileImageUrl}
        text={data.text ?? ''}
        postId={data.id}
        postedAt={data.postedAt}
        replyCount={0} //FIXME
        favorited={data.favorited}
        favoriteCount={data.favoriteCount}
        reposted={data.reposted}
        repostCount={data.repostCount}
      />
    </ViewTrigger>
  ) : (
    <></>
  );
}

export default TimelinePost;
