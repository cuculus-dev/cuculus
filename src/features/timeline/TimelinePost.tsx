'use client';

import { PostData, usePostImmutable } from '@/swr/client/post';
import ViewTrigger from '@/features/timeline/ViewportTrigger';
import Post from '@/features/timeline/layouts/Post';

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
  postId: number;
  fallbackData: PostData;
}) {
  const { data, mutate } = usePostImmutable(postId, fallbackData);

  return data ? (
    <ViewTrigger onInView={() => void mutate()} interval={5}>
      <Post
        displayName={'ククルス'}
        userName={'cuculus'}
        profileImageUrl={'/'}
        text={data.text}
        postId={data.postId}
        postedAt={new Date()}
        replyCount={0}
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
