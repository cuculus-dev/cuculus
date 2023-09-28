import { ReactNode } from 'react';
import Post from '@/components/timeline/Post';

/**
 * FIXME THIS IS MOCK
 * @constructor
 */
export default function Timeline() {
  const posts: ReactNode[] = [];
  for (let i = 0; i < 100; i++) {
    posts.push(
      <Post
        displayName={'ククルス'}
        userName={'cuculus'}
        profileImageUrl={'/'}
        text={'あああああああああああああああああああ'}
        postId={1}
        postedAt={new Date()}
        replyCount={0}
      />,
    );
  }
  return <div>{posts}</div>;
}
