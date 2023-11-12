import type { Meta, StoryObj } from '@storybook/react';
import BackButton from './BackButton';

const meta = {
  component: BackButton,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof BackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBackButton: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {},
};
