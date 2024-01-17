'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/swr/client/auth';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/app/(plain)/_components/LoadingScreen';

export default function PrivateRoute({
  children,
  showLoadingScreen = true,
}: {
  children: ReactNode;
  showLoadingScreen?: boolean;
}) {
  const { data, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      // redirect('/');
      router.replace('/');
    }
  }, [data, isLoading]);

  if (showLoadingScreen && isLoading) {
    return <LoadingScreen />;
  }

  return <>{data && children}</>;
}
