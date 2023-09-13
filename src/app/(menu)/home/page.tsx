'use client';

import Post from '@/components/timeline/Post';

export default function Home() {
  return (
    <main style={{ height: '2000px' }}>
      <Post
        displayName={'ククルス'}
        userName={'cuculus'}
        profileImageUrl={'/'}
        text={'あああああああああああああああああああ'}
        postId={1}
        postedAt={new Date()}
        replyCount={0}
      />
    </main>
  );
}
