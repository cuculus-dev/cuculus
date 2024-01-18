'use client';

import PrimaryColumn from '@/_app/(menu)/_components/main/PrimaryColumn';
import ProfileCard from '@/pages/[username]/_components/layouts/ProfileCard';
import { useUser } from '@/swr/client/user';
import UserTimeline from '@/pages/[username]/_components/UserTimeline';
import { UserWithFollows } from '@cuculus/cuculus-api';
import { useAuth } from '@/swr/client/auth';

type Props = {
  fallbackData: UserWithFollows;
};
export default function ProfilePage({ fallbackData }: Props) {
  const { data, isLoading } = useUser(fallbackData.username, fallbackData);
  const { data: authId } = useAuth();
  if (!data) {
    // FIXME 読み込み中
    return <></>;
  }

  return (
    <PrimaryColumn columnName={data.name} showBack>
      <ProfileCard authId={authId} {...data} />
      {!isLoading && <UserTimeline user={data} />}
    </PrimaryColumn>
  );
}
