import { PageProps } from 'next';
import Head from 'next/head';

const siteName = 'Cuculus';
const description = 'Cuculusは新しいけどどこか懐かしい短文投稿サービスです。';

export default function MetaHead({ metadata }: PageProps) {
  const baseUrl = process.env.SITE_URL;
  const title = metadata?.title ? `${metadata.title} | ${siteName}` : siteName;

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
      />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="application-name" content={siteName} />
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:image" content={`${baseUrl}/icon.png`} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/icon.png`} />
      <link rel="shortcut icon" href="/icon.png" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" />
    </Head>
  );
}
