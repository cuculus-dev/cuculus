'use client';

import { styled } from '@mui/material';
import SideMenu from '@/pages/_components/menu/SideMenu';
import BottomMenu from '@/pages/_components/menu/BottomMenu';
import { ReactNode } from 'react';
import MobileOpenPostDialogButton from '@/pages/_components/menu/elements/MobileOpenPostDialogButton';

const Layout = styled('div')`
  display: grid;
  grid-template-columns: minmax(275px, 6fr) minmax(600px, 600px) minmax(
      275px,
      7fr
    );
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.paper};

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    grid-template-columns: minmax(75px, 75px) minmax(600px, 600px) minmax(
        275px,
        auto
      );
  }

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: minmax(75px, 1fr) minmax(0, 600px) minmax(0, 1fr);
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: minmax(0, 600px);
  }
`;

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <SideMenu />
      {children}
      <BottomMenu />

      <MobileOpenPostDialogButton />
    </Layout>
  );
}
