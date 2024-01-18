'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/swr/client/auth';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/pages/_components/plain/LoadingScreen';

export default function GuestRoute({
  children,
  showLoadingScreen = true,
}: {
  children: ReactNode;
  showLoadingScreen?: boolean;
}) {
  const { data, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      // redirect('/home');
      router.replace('/home');
    }
  }, [data]);

  if (showLoadingScreen && isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
