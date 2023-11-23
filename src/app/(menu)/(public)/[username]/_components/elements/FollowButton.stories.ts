import type { Meta, StoryObj } from '@storybook/react';

import { FollowButton } from './FollowButton';

const meta = {
  component: FollowButton,
  tags: ['autodocs'],
} satisfies Meta<typeof FollowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalFollowButton: Story = {
  args: {
    userId: 123,
    followStatus: 'NotFollowing',
  },
};
