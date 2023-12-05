'use client';

import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import ProfileCard from '@/app/(menu)/(public)/[username]/_components/layouts/ProfileCard';
import { useUser } from '@/swr/client/user';
import UserTimeline from '@/app/(menu)/(public)/[username]/_components/UserTimeline';
import { UserWithFollows } from '@cuculus/cuculus-api';
import { useAuth } from '@/swr/client/auth';

type Props = {
  fallbackData: UserWithFollows;
};
export default function ProfilePage({ fallbackData }: Props) {
  const { data, isLoading } = useUser(fallbackData.username, fallbackData);
  const { data: authId, isLoading: authorizing } = useAuth();
  if (!data) {
    // FIXME 読み込み中
    return <></>;
  }

  return (
    <PrimaryColumn columnName={data.name} showBack>
      <ProfileCard
        name={data.name}
        username={data.username}
        id={data.id}
        protected={data._protected}
        followingCount={data.followingCount}
        followersCount={data.followersCount}
        createdAt={data.createdAt}
        bio={data.bio}
        profileImageUrl={data.profileImageUrl}
        url={data.url}
        verified={data.verified}
        authId={authId}
        authorizing={authorizing}
      />
      {!isLoading && <UserTimeline user={data} />}
    </PrimaryColumn>
  );
}
