'use client';

import { useUserPosts } from '@/swr/client/user';
import Timeline from '@/_app/(menu)/_components/timeline/Timeline';
import { UserWithFollows } from '@cuculus/cuculus-api';

/**
 * ユーザータイムライン
 * @constructor
 */
export default function UserTimeline({ user }: { user: UserWithFollows }) {
  return <Timeline timeline={useUserPosts(user.id)} />;
}
