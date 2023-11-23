import type { Meta, StoryObj } from '@storybook/react';

import ProfileCard from './ProfileCard';

const meta = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  component: ProfileCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalProfileCard: Story = {
  args: {
    id: 2,
    name: 'CureDotTyphoon',
    username: 'takecchi',
    createdAt: new Date('2023-10-04T18:57:44.373Z'),
    profileImageUrl: '/mock/profileAvatarImage.png',
    protected: false,
    verified: false,
    description: 'こんにちは。',
    url: '',
    followersCount: 2,
    followingCount: 1,
    authId: undefined,
    authorizing: false,
  },
};
