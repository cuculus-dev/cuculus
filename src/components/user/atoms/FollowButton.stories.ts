import type { Meta, StoryObj } from '@storybook/react';

import { FollowButton, FollowStatus } from './FollowButton';

const meta = {
  component: FollowButton,
  tags: ['autodocs'],
  argTypes: {
    followStatus: {
      options: Object.keys(FollowStatus),
      mapping: FollowStatus,
    },
  },
} satisfies Meta<typeof FollowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalFollowButton: Story = {
  args: {
    userId: 123,
    followStatus: FollowStatus.NotFollowing,
  },
};
