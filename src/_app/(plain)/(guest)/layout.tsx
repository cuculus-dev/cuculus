'use client';

import { ReactNode } from 'react';
import GuestRoute from '@/_app/_components/auth/GuestRoute';

export default function Layout({ children }: { children: ReactNode }) {
  return <GuestRoute>{children}</GuestRoute>;
}
