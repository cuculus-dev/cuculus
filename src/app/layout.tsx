import type { Metadata } from 'next';
import { Viewport } from 'next';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';
import theme from '@/theme/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material';

const siteName = 'Cuculus';
const description = 'Cuculusは新しいけどどこか懐かしい短文投稿サービスです。';

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL),
  applicationName: siteName,
  icons: {
    shortcut: { url: '/icon.png', type: 'image/png' },
    apple: { url: '/apple-icon.png', type: 'image/png' },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteName,
  },
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description,
  openGraph: {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    description,
    siteName: siteName,
    locale: 'ja_JP',
    type: 'article',
    images: ['/icon.png'],
  },
  twitter: {
    card: 'summary',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" style={{ overflowY: 'scroll' }}>
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_CUCULUS_API_URL} />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
