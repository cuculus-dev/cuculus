'use client';

import MobileBottomMenuLinkItem from '@/features/mobile-menu/elements/MobileBottomMenuLinkItem';
import { useProfile } from '@/swr/client/auth';
import { Home, Mail, Notifications, Search } from '@mui/icons-material';
import { styled } from '@mui/material';

const Menu = styled('nav')`
  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }

  background-color: white;
  border-top: solid 1px lightgray;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export default function MobileBottomMenu() {
  const { data: profile } = useProfile();

  return (
    <>
      {profile && (
        <Menu>
          <MobileBottomMenuLinkItem icon={<Home />} href={'/home'} />
          <MobileBottomMenuLinkItem icon={<Search />} href={'/search'} />
          <MobileBottomMenuLinkItem
            icon={<Notifications />}
            href={'/notifications'}
          />
          <MobileBottomMenuLinkItem icon={<Mail />} href={'/messages'} />
        </Menu>
      )}
    </>
  );
}
