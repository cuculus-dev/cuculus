'use client';

import Post from '@/components/timeline/Post';
import { useState } from 'react';

export default function Home() {
  //TODO レンダリング動作確認用
  const [favorited, setFavorite] = useState(false);
  const [reposted, setRepost] = useState(false);

  return (
    <main style={{ height: '2000px' }}>
      <button onClick={() => setFavorite(!favorited)}>お気に入り</button>
      <button onClick={() => setRepost(!reposted)}>リポスト</button>
      <Post
        displayName={'ククルス'}
        userName={'cuculus'}
        profileImageUrl={'/'}
        text={'あああああああああああああああああああ'}
        postId={1}
        postedAt={new Date()}
        replyCount={0}
        favorited={favorited}
        favoriteCount={0}
        reposted={reposted}
        repostCount={0}
      />
    </main>
  );
}
