'use client';

import MobileBottomMenuLinkItem from '@/features/menu/elements/MobileBottomMenuLinkItem';
import { useProfile } from '@/swr/client/auth';
import {
  Home,
  HomeOutlined,
  Notifications,
  NotificationsOutlined,
  Search,
  SearchOutlined,
  Settings,
  SettingsOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material';

const Menu = styled('nav')`
  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }

  height: ${({ theme }) => theme.mixins.bottomMenu.height}px;
  background-color: white;
  border-top: solid 1px lightgray;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Spacer = styled('div')`
  height: ${({ theme }) => theme.mixins.bottomMenu.height}px;

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }
`;

export default function MobileBottomMenu() {
  const { data: profile } = useProfile();

  return (
    <>
      <Spacer />
      {profile && (
        <Menu>
          <MobileBottomMenuLinkItem
            icon={<HomeOutlined />}
            activeIcon={<Home />}
            href={'/home'}
          />
          <MobileBottomMenuLinkItem
            icon={<SearchOutlined />}
            activeIcon={<Search />}
            href={'/search'}
          />
          <MobileBottomMenuLinkItem
            icon={<NotificationsOutlined />}
            activeIcon={<Notifications />}
            href={'/notifications'}
          />
          <MobileBottomMenuLinkItem
            icon={<SettingsOutlined />}
            activeIcon={<Settings />}
            href={'/settings'}
          />
        </Menu>
      )}
    </>
  );
}
