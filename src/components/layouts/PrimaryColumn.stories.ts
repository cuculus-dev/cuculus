import type { Meta, StoryObj } from '@storybook/react';
import PrimaryColumn from '@/components/layouts/PrimaryColumn';

const meta: Meta<typeof PrimaryColumn> = {
  component: PrimaryColumn,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPrimaryColumn: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    columnName: 'Title',
    children: 'children',
  },
};
