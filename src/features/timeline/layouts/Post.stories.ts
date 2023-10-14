import type { Meta, StoryObj } from '@storybook/react';

import Post from './Post';

const meta = {
  component: Post,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalPost: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    displayName: 'ククルス',
    userName: 'cuculus',
    profileImageUrl: '/',
    text: 'ココに文章が表示されます。\n改行も適用されます。',
    postId: 1,
    postedAt: new Date(),
    replyCount: 0,
    repostCount: 0,
    favoriteCount: 0,
    favorited: false,
    reposted: false,
  },
};
