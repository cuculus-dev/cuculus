import '@/styles/globals.css';

import type { Metadata } from 'next';
import EmotionRegistry from '@/app/_providers/Registry';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

const siteName = 'Cuculus';
const description = 'Cuculusは新しいけどどこか懐かしい短文投稿サービスです。';

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
