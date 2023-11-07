'use client';

import PrimaryColumn from '@/components/layouts/PrimaryColumn';
import ProfileCard from '@/features/user/layouts/ProfileCard';
import { useUserImmutable } from '@/swr/client/user';

type Props = {
  username: string;
};
export default function ProfilePage({ username }: Props) {
  const { data } = useUserImmutable(username);

  if (!data) {
    // FIXME 読み込み中
    return <></>;
  }

  return (
    <PrimaryColumn columnName={data.name}>
      <ProfileCard
        bio={data.description}
        displayName={data.name}
        followStatus={0}
        profileAvatarImageUrl={data.profileImageUrl}
        profileHeaderImageUrl=""
        userName={data.username}
        followingCount={data.followingCount}
        followersCount={data.followersCount}
        userId={data.id}
      />
      <div style={{ height: '2000px' }}>
        ここにユーザータイムラインが表示される
      </div>
    </PrimaryColumn>
  );
}
