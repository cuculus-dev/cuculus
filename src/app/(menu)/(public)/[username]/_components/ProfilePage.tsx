'use client';

import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import ProfileCard from '@/app/(menu)/(public)/[username]/_components/layouts/ProfileCard';
import { useUserImmutable } from '@/swr/client/user';
import UserTimeline from '@/app/(menu)/(public)/[username]/_components/UserTimeline';

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
    <PrimaryColumn columnName={data.name} showBack>
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
      <UserTimeline user={data} />
    </PrimaryColumn>
  );
}
