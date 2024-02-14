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
    author: {
      name: 'ククルス',
      username: 'cuculus',
      profileImageUrl: '/',
    },
    text: 'ココに文章が表示されます。\n改行も適用されます。',
    id: '27392710123986944',
    postedAt: new Date(),
    repostCount: 0,
    favoriteCount: 0,
    favorited: false,
    reposted: false,
  },
};
