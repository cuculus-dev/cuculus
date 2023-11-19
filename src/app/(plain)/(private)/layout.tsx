'use client';

import { useAuth } from '@/swr/client/auth';
import { ReactNode, useEffect } from 'react';
import { redirect } from 'next/navigation';
import LoadingScreen from '@/app/(plain)/_components/LoadingScreen';

export default function Layout({ children }: { children: ReactNode }) {
  const { data, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !data) {
      redirect('/');
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{data && children}</>;
}
