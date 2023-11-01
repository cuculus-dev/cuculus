import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Development robots.txt
  if (process.env.NODE_ENV !== 'production') {
    return {
      rules: {
        userAgent: '*',
        disallow: ['/'],
      },
    };
  }
  // Production robots.txt
  return {
    rules: [
      {
        userAgent: 'Yahoo Pipes 1.0',
        disallow: ['/'],
      },
      {
        userAgent: 'Livelapbot',
        disallow: ['/'],
      },
      {
        userAgent: 'Megalodon',
        disallow: ['/'],
      },
      {
        userAgent: 'ia_archiver',
        disallow: ['/'],
      },
    ],
    sitemap: process.env.SITE_URL + '/sitemaps.xml',
  };
}
