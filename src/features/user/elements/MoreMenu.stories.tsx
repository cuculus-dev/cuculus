import type { Meta, StoryObj } from '@storybook/react';

import MoreMenu from './MoreMenu';
import { Button } from '@mui/material';
import { useRef } from 'react';

const MenuWithButton = ({ open }: { open: boolean }) => {
  const ref = useRef(null);
  return (
    <Button ref={ref} disabled variant="contained">
      REF
      <MoreMenu anchorEl={ref.current} open={open} />
    </Button>
  );
};

const meta = {
  component: MenuWithButton,
  tags: ['autodocs'],
} satisfies Meta<typeof MenuWithButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalMoreMenu: Story = {
  args: {
    open: false,
  },
};
