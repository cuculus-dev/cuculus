'use client';

import { ReactNode, useEffect } from 'react';
import PrivateRoute from '@/app/_components/auth/PrivateRoute';

export default function Layout({ children }: { children: ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
