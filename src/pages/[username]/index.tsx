import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageWithLayout,
  PageProps,
} from 'next';
import { usersApi } from '@/libs/cuculus-client';
import ProfilePage from '@/app/(menu)/(public)/[username]/_components/ProfilePage';
import { UserWithFollows } from '@cuculus/cuculus-api';
import MenuLayout from '@/app/(menu)/layout';

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

// export async function generateMetadata({ params }: Params): Promise<Metadata> {
//   const user = await fetchUser(params.username);
//   if (!user) {
//     return {};
//   }
//
//   const title = `${user.name} (@${user.username}) さん`;
//   const description =
//     user.bio.length > 0
//       ? user.bio
//       : `${user.name} さんはCuculusを利用しています。`;
//
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       siteName: 'Cuculus',
//       locale: 'ja_JP',
//       type: 'article',
//       images: [user.profileImageUrl],
//     },
//     twitter: {
//       card: 'summary',
//     },
//   };
// }

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
    props: { userJson: JSON.stringify(user), metadata: { title, description } },
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
