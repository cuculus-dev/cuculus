'use client';

import FollowList from '@/app/(menu)/(public)/[username]/_components/layouts/FollowList';
import { useFollowing } from '@/swr/client/follows';
import { UserWithFollows } from '@cuculus/cuculus-api';

/**
 * フォロー一覧表示コンポーネント
 * @param user
 * @constructor
 */
export default function Following({ user }: { user: UserWithFollows }) {
  return <FollowList follows={useFollowing(user.id)} />;
}
