import type { Meta, StoryObj } from '@storybook/react';

import ProfileCard from './ProfileCard';
import { FollowStatus } from '@/components/user/atoms/FollowButton';

const meta = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  component: ProfileCard,
  tags: ['autodocs'],
  argTypes: {
    followStatus: {
      options: Object.keys(FollowStatus),
      mapping: FollowStatus,
      control: 'select',
    },
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalProfileCard: Story = {
  args: {
    bio: 'bio\nstring',
    displayName: 'dispName',
    followedCount: 123456,
    followsCount: 456789,
    followStatus: FollowStatus.NotFollowing,
    profileAvatarImageUrl: '/mock/profileAvatarImage.png',
    profileHeaderImageUrl: '/mock/profileHeaderImage.png',
    userId: 123,
    userName: 'userName',
  },
};