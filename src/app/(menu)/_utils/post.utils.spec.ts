import { UserPost } from '@cuculus/cuculus-api';
import { isQuotedRepost, isRepost } from '@/app/(menu)/_utils/post.utils';

describe('PostUtils Integration Test', () => {
  // 通常の投稿
  const post = {
    id: '2',
    text: 'Hello.',
    originalPostId: undefined,
  } as UserPost;

  // リポスト
  const repost = {
    id: '3',
    text: undefined,
    originalPostId: '1',
  } as UserPost;

  // 引用リポスト
  const quotedRepost = {
    id: '4',
    text: 'Hello.',
    originalPostId: '1',
  } as UserPost;

  describe('リポストかどうか', () => {
    it('通常の投稿', () => {
      expect(isRepost(post)).toBe(false);
    });

    it('リポスト', () => {
      expect(isRepost(repost)).toBe(true);
    });

    it('引用リポスト', () => {
      expect(isRepost(quotedRepost)).toBe(false);
    });
  });

  describe('引用リポストかどうか', () => {
    it('通常の投稿', () => {
      expect(isQuotedRepost(post)).toBe(false);
    });

    it('リポスト', () => {
      expect(isQuotedRepost(repost)).toBe(false);
    });

    it('引用リポスト', () => {
      expect(isQuotedRepost(quotedRepost)).toBe(true);
    });
  });
});
