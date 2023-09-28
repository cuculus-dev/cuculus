import { ReactNode, useMemo } from 'react';
import Post from '@/components/timeline/Post';

/**
 * FIXME THIS IS MOCK
 * @constructor
 */
export default function Timeline() {
  const posts: ReactNode[] = useMemo(() => {
    const tempPosts: ReactNode[] = [];
    for (let i = 0; i < 10; i++) {
      tempPosts.push(
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
    return tempPosts;
  }, []);
  return <div>{posts}</div>;
}
