import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageWithLayout,
  PageProps,
} from 'next';
import { usersApi } from '@/libs/cuculus-client';
import ProfilePage from '@/pages/[username]/_components/ProfilePage';
import { UserWithFollows } from '@cuculus/cuculus-api';
import MenuLayout from '@/pages/_components/menu/MenuLayout';

async function fetchUser(username: string) {
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
}

export const getServerSideProps = (async (context) => {
  const username = String(context.query.username);
  const user = await fetchUser(username);
  if (!user) {
    return {
      notFound: true,
    };
  }

  const title = `${user.name} (@${user.username}) さん`;
  const description =
    user.bio.length > 0
      ? user.bio
      : `${user.name} さんはCuculusを利用しています。`;

  return {
    props: {
      userJson: JSON.stringify(user),
      metadata: { title, description, images: [user.profileImageUrl] },
    },
  };
}) satisfies GetServerSideProps<{ userJson: string } & PageProps>;

const Page: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userJson }) => {
  const user = JSON.parse(userJson) as UserWithFollows;
  return <ProfilePage fallbackData={user} />;
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

export default Page;
