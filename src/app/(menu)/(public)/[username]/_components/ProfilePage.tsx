'use client';

import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import ProfileCard from '@/app/(menu)/(public)/[username]/_components/layouts/ProfileCard';
import { useUser } from '@/swr/client/user';
import UserTimeline from '@/app/(menu)/(public)/[username]/_components/UserTimeline';
import { UserWithFollows } from '@cuculus/cuculus-api';

type Props = {
  fallbackData: UserWithFollows;
};
export default function ProfilePage({ fallbackData }: Props) {
  const { data, isLoading } = useUser(fallbackData.username, fallbackData);

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
      {!isLoading && <UserTimeline user={data} />}
    </PrimaryColumn>
  );
}
