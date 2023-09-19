import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { MoreHoriz } from '@mui/icons-material';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// childrenにReactElement渡したい場合はファイル形式をtsxにするしかない？
// UIのドロップダウンからアイコン切り替えできると便利だよね…
export const DefaultIconButton: Story = {
  args: {
    children: <MoreHoriz />,
    color: 'primary',
    variant: 'icon',
  },
};
