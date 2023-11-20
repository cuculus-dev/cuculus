import type { Meta, StoryObj } from '@storybook/react';
import CapsuleButton from './CapsuleButton';

const meta: Meta<typeof CapsuleButton> = {
  component: CapsuleButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCapsuleButton: Story = {
  args: {
    children: 'Default Button',
    color: 'primary',
    variant: 'text',
  },
};
