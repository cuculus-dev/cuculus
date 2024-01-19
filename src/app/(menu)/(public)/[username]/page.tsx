import { cache } from 'react';
import { Metadata } from 'next';
import { usersApi } from '@/libs/cuculus-client';
import { notFound } from 'next/navigation';
import ProfilePage from '@/app/(menu)/(public)/[username]/_components/ProfilePage';

type Params = { params: { username: string } };

const getUser = cache(async (username: string) => {
  try {
    return await usersApi.getUserByUsername(
      { username },
      {
        next: {
          revalidate: 300,
        },
      },
    );
  } catch {
    return undefined;
  }
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const user = await getUser(params.username);
  if (!user) {
    return {};
  }

  const title = `${user.name} (@${user.username}) さん`;
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
      siteName: 'Cuculus',
      locale: 'ja_JP',
      type: 'article',
      images: [user.profileImageUrl],
    },
    twitter: {
      card: 'summary',
    },
  };
}

export default async function page({ params }: Params) {
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }

  return <ProfilePage fallbackData={user} />;
}
