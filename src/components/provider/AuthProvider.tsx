'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/swr/client/auth';

type Props = {
  children?: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  useAuth();
  return <>{children}</>;
};

export default AuthProvider;
