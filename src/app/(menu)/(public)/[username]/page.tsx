import { Metadata } from 'next';
import { usersApi } from '@/libs/cuculus-client';
import { notFound } from 'next/navigation';
import ProfilePage from '@/app/(menu)/(public)/[username]/_components/ProfilePage';

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
    user.bio.length > 0
      ? user.bio
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

  return <ProfilePage fallbackData={user} />;
}
