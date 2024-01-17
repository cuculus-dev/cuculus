'use client';

import { ReactNode } from 'react';
import PrivateRoute from '@/app/_components/auth/PrivateRoute';

export default function Layout({ children }: { children: ReactNode }) {
  return <PrivateRoute showLoadingScreen={false}>{children}</PrivateRoute>;
}
