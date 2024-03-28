import PrimaryColumn from '@/app/(menu)/_components/main/PrimaryColumn';
import { cache } from 'react';
import { usersApi } from '@/libs/cuculus-client';
import { notFound } from 'next/navigation';
import Following from '@/app/(menu)/(public)/[username]/_components/Following';

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

/**
 * フォロー一覧ページ
 * @param params
 */
export default async function page({ params }: Params) {
  const username = decodeURIComponent(params.username);
  const user = await getUser(username);
  if (!user) {
    notFound();
  }

  return (
    <PrimaryColumn hideHeader={true}>
      <Following user={user} />
    </PrimaryColumn>
  );
}
