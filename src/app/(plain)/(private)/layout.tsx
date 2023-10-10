'use client';

import { useAuth } from '@/swr/client/auth';
import { ReactNode, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const { data, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !data) {
      redirect('/');
    }
  }, [data, isLoading]);

  return <>{data && children}</>;
}
