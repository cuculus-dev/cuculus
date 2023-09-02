'use client';

import { styled } from '@mui/material';
import SideMenu from '@/components/menu/SideMenu';

const Layout = styled('div')`
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: 100vh;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    // モバイル
    grid-template-columns: 1fr;
  }
`;

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <SideMenu />
      {children}
    </Layout>
  );
}
