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
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
  },
  reactStrictMode: true,
  swcMinify: true,
  headers: async () => [
    {
      source: '/logout',
      headers: [
        /** @see {@link https://developer.mozilla.org/docs/Web/HTTP/Headers/Clear-Site-Data} */
        {
          // FIXME このヘッダ使えない？
          key: 'Clear-Site-Data',
          value: '"cache" "storage"',
        },
      ],
    },
  ],
};

module.exports = withPWA(nextConfig);
