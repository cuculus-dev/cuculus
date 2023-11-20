'use client';

import MobileBottomMenuLinkItem from '@/app/(menu)/_components/menu/elements/MobileBottomMenuLinkItem';
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

  height: calc(
    ${({ theme }) => theme.mixins.bottomMenu.height}px +
      env(safe-area-inset-bottom)
  );
  background-color: white;
  border-top: solid 1px lightgray;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: env(safe-area-inset-bottom, 0);
`;

const Spacer = styled('div')`
  height: calc(
    ${({ theme }) => theme.mixins.bottomMenu.height}px +
      env(safe-area-inset-bottom)
  );

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }
`;

export default function BottomMenu() {
  const { data: profile } = useProfile();

  return (
    <>
      {profile && <Spacer />}
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
