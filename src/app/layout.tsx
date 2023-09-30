import '@/styles/globals.css';

import type { Metadata } from 'next';
import EmotionRegistry from '@/components/provider/Registry';
import CssBaseline from '@mui/material/CssBaseline';
import AuthProvider from '@/components/provider/AuthProvider';

const title = 'Cuculus';
const description = 'Cuculusは新しいけどどこか懐かしい短文投稿サービスです。';

export const metadata: Metadata = {
  applicationName: title,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title,
  },
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@cuculus_jp',
    creator: '@CureDotTyphoon',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" style={{ overflowY: 'scroll' }}>
      <head />
      <CssBaseline />
      <body>
        <EmotionRegistry>
          <AuthProvider>{children}</AuthProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
