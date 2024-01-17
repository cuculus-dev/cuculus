import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { AppPropsWithLayout } from 'next/app';
import { ReactElement } from 'react';
import PrivateRoute from '@/app/_components/auth/PrivateRoute';
import GuestRoute from '@/app/_components/auth/GuestRoute';

function getAccessLevelRoute(
  children: ReactElement,
  accessLevel: 'private' | 'public' | 'guest',
  showLoadingScreen: boolean,
) {
  switch (accessLevel) {
    case 'private':
      return (
        <PrivateRoute showLoadingScreen={showLoadingScreen}>
          {children}
        </PrivateRoute>
      );
    case 'guest':
      return (
        <GuestRoute showLoadingScreen={showLoadingScreen}>
          {children}
        </GuestRoute>
      );
    default:
      return <>{children}</>;
  }
}

export default function App(props: AppPropsWithLayout) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const accessLevel = Component.accessLevel ?? 'public';
  const showLoadingScreen = Component.getLayout === undefined;
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(
          getAccessLevelRoute(
            <Component {...pageProps} />,
            accessLevel,
            showLoadingScreen,
          ),
        )}
      </ThemeProvider>
    </AppCacheProvider>
  );
}
