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
  args: {
    displayName: 'ククルス',
    userName: 'cuculus',
    postedAt: new Date(),
    profileImageUrl: '/',
    text: 'ココに文章が表示されます。\n改行も適用されます。',
  },
};
