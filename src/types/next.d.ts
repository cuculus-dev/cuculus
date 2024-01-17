import { NextPage, NextPageWithLayout, PageProps } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';

declare module 'next' {
  type PageProps = {
    metadata?: {
      title?: string;
      description?: string;
    };
  };

  type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    accessLevel?: 'private' | 'public' | 'guest';
  };
}

declare module 'next/app' {
  type AppPropsWithLayout = Omit<AppProps, 'pageProps'> & {
    Component: NextPageWithLayout;
    pageProps: PageProps;
  };
}
