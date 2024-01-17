'use client';

import { ReactNode } from 'react';
import GuestRoute from '@/app/_components/auth/GuestRoute';

export default function Layout({ children }: { children: ReactNode }) {
  return <GuestRoute>{children}</GuestRoute>;
}
