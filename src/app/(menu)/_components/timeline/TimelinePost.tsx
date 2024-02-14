'use client';

import { usePost } from '@/swr/client/post';
import ViewTrigger from '@/app/(menu)/_components/timeline/ViewportTrigger';
import Post from '@/app/(menu)/_components/timeline/layouts/Post';
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
  // FIXME 個別取得APIが出来たらmutateで更新するようにする
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, mutate } = usePost(postId, fallbackData);

  return data ? (
    <ViewTrigger
      onInView={() => {
        // void mutate();
      }}
      interval={5}
    >
      <Post {...data} />
    </ViewTrigger>
  ) : (
    <></>
  );
}

export default TimelinePost;
