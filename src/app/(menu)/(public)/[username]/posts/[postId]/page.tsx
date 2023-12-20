import { Metadata } from 'next';
import { postsApi } from '@/libs/cuculus-client';
import { notFound, redirect } from 'next/navigation';
import { PostPage } from '@/app/(menu)/(public)/[username]/posts/_components/PostPage';

const TITLE_MAX_LENGTH = 70;

type Params = { params: { username: string; postId: string } };

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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await fetchPost(params.postId);
  if (!post) {
    return {};
  }

  let originalUser = post.author.name;
  let originalPost = post.text ?? '';

  if (post.originalPost) {
    originalUser = post.originalPost.author.name;
    originalPost = post.originalPost.text ?? '';
  }

  let title = `${originalUser}さん:「${originalPost}」`;

  // 最大長を超える場合は省略
  if (title.length > TITLE_MAX_LENGTH) {
    title = title.substring(0, TITLE_MAX_LENGTH - 3) + '...';
  }

  return {
    title,
    openGraph: {
      title: `${originalUser} さんの投稿`,
      description: `「${originalPost}」`,
      siteName: 'Cuculus',
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary',
    },
  };
}

export default async function page({ params }: Params) {
  const post = await fetchPost(params.postId);

  // TODO 権限エラーの場合はそのままPostPageにundefinedを投げる
  if (!post) {
    notFound();
  }

  if (post.author.username !== params.username) {
    redirect(`/${post.author.username}/posts/${post.id}`);
  }

  return <PostPage postId={params.postId} fallbackData={post} />;
}
