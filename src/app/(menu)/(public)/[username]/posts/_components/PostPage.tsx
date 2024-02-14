'use client';

import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { UserPost } from '@cuculus/cuculus-api';
import { usePost } from '@/swr/client/post';
import Post from '@/app/(menu)/_components/timeline/layouts/Post';

type Props = {
  postId: string;
  fallbackData?: UserPost;
};

// FIXME 仮作成。一旦タイムラインのコンポーネントと同じものを使用する
export function PostPage({ postId, fallbackData }: Props) {
  const { data } = usePost(postId, fallbackData);

  if (!data) {
    // FIXME 読み込み中
    return <></>;
  }

  return (
    <PrimaryColumn columnName="ポスト" showBack>
      <Post {...data} />
    </PrimaryColumn>
  );
}
