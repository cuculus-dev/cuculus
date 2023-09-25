'use client';

import { useAuth } from '@/swr/client/auth';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Top() {
  const { data } = useAuth();

  useEffect(() => {
    if (data) {
      redirect('/home');
    }
  }, [data]);

  return <>top</>;
}
