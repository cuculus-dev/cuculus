'use client';

import { styled } from '@mui/material';
import SideMenu from '@/features/menu/SideMenu';
import MobileBottomMenu from '@/features/mobile-menu/MobileBottomMenu';
import { ReactNode } from 'react';

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
    grid-template-columns: minmax(75px, 1fr) 5fr;
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: 1fr;
  }
`;

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <SideMenu />
      {children}
      <div />
      <MobileBottomMenu />
    </Layout>
  );
}
