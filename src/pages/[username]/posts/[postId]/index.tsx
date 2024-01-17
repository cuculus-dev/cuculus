import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageWithLayout,
} from 'next';
import { postsApi } from '@/libs/cuculus-client';
import { PostPage } from '@/app/(menu)/(public)/[username]/posts/_components/PostPage';
import { UserPost } from '@cuculus/cuculus-api';
import MenuLayout from '@/app/(menu)/layout';

// const TITLE_MAX_LENGTH = 70;

async function fetchPost(postId: string) {
  try {
    return await postsApi.getPost(
      { id: postId },
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
//   const post = await fetchPost(params.postId);
//   if (!post) {
//     return {};
//   }
//
//   let originalUser = post.author.name;
//   let originalPost = post.text ?? '';
//   let originalImage = post.author.profileImageUrl;
//
//   if (post.originalPost) {
//     originalUser = post.originalPost.author.name;
//     originalPost = post.originalPost.text ?? '';
//     originalImage = post.originalPost.author.profileImageUrl;
//   }
//
//   let title = `${originalUser}さん:「${originalPost}」`;
//
//   // 最大長を超える場合は省略
//   if (title.length > TITLE_MAX_LENGTH) {
//     title = title.substring(0, TITLE_MAX_LENGTH - 3) + '...';
//   }
//
//   return {
//     title,
//     openGraph: {
//       title: `${originalUser} さんの投稿`,
//       description: `「${originalPost}」`,
//       siteName: 'Cuculus',
//       locale: 'ja_JP',
//       type: 'article',
//       images: [originalImage],
//     },
//     twitter: {
//       card: 'summary',
//     },
//   };
// }

export const getServerSideProps = (async (context) => {
  const postId = String(context.query.postId);
  const post = await fetchPost(postId);

  // TODO 権限エラーの場合はそのままPostPageにundefinedを投げる
  if (!post) {
    return {
      notFound: true,
    };
  }

  const username = String(context.query.username);

  if (post.author.username !== username) {
    return {
      redirect: {
        permanent: false,
        destination: `/${post.author.username}/posts/${post.id}`,
      },
    };
  }

  context.res.setHeader(
    'Cache-Control',
    's-maxage=86400, stale-while-revalidate=86400',
  );

  return { props: { postJson: JSON.stringify(post) } };
}) satisfies GetServerSideProps<{ postJson: string }>;

const Page: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ postJson }) => {
  const post = JSON.parse(postJson) as UserPost;
  return <PostPage postId={post.id} fallbackData={post} />;
};

Page.getLayout = (children) => <MenuLayout>{children}</MenuLayout>;

export default Page;
