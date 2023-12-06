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
          revalidate: 86400,
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

  let title = `${post.author.name}さん:「${post.text ?? ''}」`;
  if (post.originalPost) {
    title = `${post.originalPost.author.name}さん:「${
      post.originalPost.text ?? ''
    }」`;
  }

  // 最大長を超える場合は省略
  if (title.length > TITLE_MAX_LENGTH) {
    title = title.substring(0, TITLE_MAX_LENGTH - 3) + '...';
  }
  title = title + ' | Cuculus';

  return {
    title,
    openGraph: {
      title,
      siteName: title,
      locale: 'ja_JP',
      type: 'profile',
    },
    twitter: {
      title,
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
