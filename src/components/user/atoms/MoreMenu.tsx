'use client';

import {
  Menu as MuiDefaultMenu,
  MenuItem as MuiDefaultMenuItem,
  MenuProps,
  styled,
} from '@mui/material';

const Menu = styled(MuiDefaultMenu)`
  position: absolute;
`;

const MenuItem = styled(MuiDefaultMenuItem)``;

type OmitKey = 'children' | 'disableScrollLock';

interface MoreMenuProps extends Omit<MenuProps, OmitKey> {}

export default function (props: MoreMenuProps) {
  return (
    <Menu
      {...props}
      disableScrollLock={true}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem>item1</MenuItem>
      <MenuItem>item2</MenuItem>
      <MenuItem>item3</MenuItem>
    </Menu>
  );
}
