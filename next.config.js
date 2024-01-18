const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate=86400',
          },
          {
            key: 'X-DEBUG',
            value: 'all',
          },
        ],
      },
      {
        source: '/:username',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate=86400',
          },
          {
            key: 'X-DEBUG',
            value: 'username',
          },
        ],
      },
      {
        source: '/:username/posts/:postId',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate=86400',
          },
          {
            key: 'X-DEBUG',
            value: 'post',
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
