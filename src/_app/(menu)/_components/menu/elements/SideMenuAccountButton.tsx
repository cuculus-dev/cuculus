'use client';

import {
  Avatar as MuiDefaultAvatar,
  Box,
  styled,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuItemStyleBase from './SideMenuItemStyleBase';
import { useRef, useState } from 'react';
import NextLink from 'next/link';
import { Logout, Person } from '@mui/icons-material';

const Flex = styled(Box)`
  display: flex;
  height: 100%;
  width: 100%;
`;

const HFlex = styled(Flex)`
  flex-direction: row;
`;

const Grid = styled(Box)`
  display: grid;
`;

const Avatar = styled(MuiDefaultAvatar)`
  aspect-ratio: 1;
  height: 40px;
  margin-bottom: auto;
  margin-top: auto;
  width: 40px;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    height: auto;
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
  }
`;

const DisplayName = styled(Box)`
  font-size: 1.1rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    display: none;
  }
`;

const UserName = styled(Box)`
  font-size: 0.9rem;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    display: none;
  }
`;

const StyledNextLink = styled(NextLink)`
  align-items: center;
  color: black;
  display: flex;
  gap: 0.5rem;
  height: 100%;
  margin: 0;
  padding: 0;
  text-decoration: none;
  width: 100%;
`;

const StyledItem = styled(MenuItem)`
  width: 100%;
`;

interface Props {
  displayName: string;
  userName: string;
  profileAvatarImageUrl: string;
}

const SideMenuAccountButton = ({
  displayName,
  userName,
  profileAvatarImageUrl,
}: Props) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef(null);

  return (
    <MenuItemStyleBase>
      <HFlex
        gap={1}
        ref={accountMenuRef}
        onClick={() => setShowAccountMenu(true)}
      >
        <Avatar src={profileAvatarImageUrl} alt={'プロフィール画像'} />

        <Grid gridTemplateRows={'repeat(2, 1fr)'} overflow={'hidden'}>
          <DisplayName>{displayName}</DisplayName>
          <UserName>@{userName}</UserName>
        </Grid>
      </HFlex>

      <Menu
        open={showAccountMenu}
        onClose={() => setShowAccountMenu(false)}
        anchorEl={accountMenuRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        disableRestoreFocus
        disableAutoFocusItem
      >
        <StyledNextLink href={`${userName}`}>
          <StyledItem>
            <Person />
            プロフィール
          </StyledItem>
        </StyledNextLink>

        <StyledNextLink href="/logout">
          <StyledItem>
            <Logout />
            ログアウト
          </StyledItem>
        </StyledNextLink>
      </Menu>
    </MenuItemStyleBase>
  );
};

export default SideMenuAccountButton;
