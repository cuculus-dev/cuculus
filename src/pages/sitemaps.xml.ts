import { GetServerSidePropsContext } from 'next';

function generateSiteMap() {
  // サイトマップAPIが出来たらここで叩く
  return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
   </sitemapindex>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export function getServerSideProps({ res }: GetServerSidePropsContext) {
  const sitemap = generateSiteMap();

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
