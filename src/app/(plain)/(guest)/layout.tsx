'use client';

import { useAuth } from '@/react-query/client/auth';
import { ReactNode, useEffect } from 'react';
import { redirect } from 'next/navigation';
import LoadingScreen from '@/app/(plain)/_components/LoadingScreen';

export default function Layout({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useAuth();

  useEffect(() => {
    if (data && !isError) {
      redirect('/home');
    }
  }, [data, isError]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
