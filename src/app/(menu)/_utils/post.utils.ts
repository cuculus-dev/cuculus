import { UserPost } from '@cuculus/cuculus-api';

/**
 * リポストか否か
 * @param post
 */
export function isRepost(post: UserPost): boolean {
  return post.originalPostId !== undefined && !post.text;
}

/**
 * 引用リポストか否か
 * @param post
 */
export function isQuotedRepost(post: UserPost): boolean {
  return post.originalPostId !== undefined && post.text !== undefined;
}
