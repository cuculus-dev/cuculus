import ProfileCard from '@/features/user/layouts/ProfileCard';
import PrimaryColumn from '@/components/layouts/PrimaryColumn';
import { Metadata } from 'next';
import { usersApi } from '@/libs/cuculus-client';
import { notFound } from 'next/navigation';

type Params = { params: { username: string } };

async function fetchUser(username: string) {
  try {
    return await usersApi.getUserByUsername({ username });
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const user = await fetchUser(params.username);
  if (!user) {
    return {};
  }

  const title = `${user.name} (@${user.username}) さん | Cuculus`;
  const description =
    user.description.length > 0
      ? user.description
      : `${user.name} さんはCuculusを利用しています。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      locale: 'ja_JP',
      type: 'profile',
      images: [user.profileImageUrl],
    },
    twitter: {
      title,
      card: 'summary',
      images: [user.profileImageUrl],
    },
  };
}

export default async function page({ params }: Params) {
  const user = await fetchUser(params.username);
  if (!user) {
    notFound();
  }

  return (
    <main>
      {/* FIXME mock値 */}
      <PrimaryColumn columnName={user.name}>
        <ProfileCard
          bio={user.description}
          displayName={user.name}
          followStatus={0}
          profileAvatarImageUrl={user.profileImageUrl}
          profileHeaderImageUrl=""
          userName={params.username}
          followsCount={123456}
          followedCount={123456}
          userId={user.id}
        />
        <div style={{ height: '2000px' }}>
          ここにユーザータイムラインが表示される
        </div>
      </PrimaryColumn>
    </main>
  );
}
