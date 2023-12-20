import '@/styles/globals.css';

import type { Metadata } from 'next';
import EmotionRegistry from '@/app/_providers/Registry';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

const title = 'Cuculus';
const description = 'Cuculusは新しいけどどこか懐かしい短文投稿サービスです。';

export const metadata: Metadata = {
  applicationName: title,
  icons: {
    shortcut: { url: '/icon.png', type: 'image/png' },
    apple: { url: '/apple-icon.png', type: 'image/png' },
  },
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
    images: ['/icon.png'],
  },
  twitter: {
    card: 'summary',
  },
  viewport: 'viewport-fit=cover, width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" style={{ overflowY: 'scroll' }}>
      <head />
      <CssBaseline />
      <body>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
