'use client';

import { useAuth } from '@/react-query/client/auth';
import { ReactNode, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useAuth();

  useEffect(() => {
    if (!isLoading && isError) {
      redirect('/');
    }
  }, [isError, isLoading]);

  return <>{data && children}</>;
}
