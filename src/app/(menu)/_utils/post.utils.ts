type BasePost = {
  originalPostId?: string;
  text?: string;
};

/**
 * リポストか否か
 * @param post
 */
export function isRepost(post: BasePost): boolean {
  return post.originalPostId !== undefined && !post.text;
}

/**
 * 引用リポストか否か
 * @param post
 */
export function isQuotedRepost(post: BasePost): boolean {
  return post.originalPostId !== undefined && post.text !== undefined;
}
