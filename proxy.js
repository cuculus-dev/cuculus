require('dotenv').config();
require('dotenv').config({ path: './.env.local' });

const SITE_URL = process.env.SITE_URL;
const API_URL = process.env.NEXT_PUBLIC_CUCULUS_API_URL;

const siteUrl = new URL(SITE_URL);
const apiUrl = new URL(API_URL);

const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.STAGE !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Next.js を localhost:3000 で起動
app.prepare().then(() => {
  const server = express();

  // .well-known/*へのリクエストをプロキシする
  server.use(
    '/.well-known/*',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    }),
  );

  // users/*へのリクエストをプロキシする
  server.use(
    '/users/*',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    }),
  );

  // nodeinfo/*へのリクエストをプロキシする
  server.use(
    '/nodeinfo/*',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    }),
  );

  // inboxへのリクエストをプロキシする
  server.use(
    '/inbox',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    }),
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(siteUrl.port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${siteUrl.port}`);
  });
});

// localhost:8080 へのアクセスを 開発環境 にプロキシ
const proxy = express();
proxy.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.develop.cuculus.jp',
    changeOrigin: true,
    secure: false,
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('host', siteUrl.hostname);
    },
    onProxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = SITE_URL;
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      // Set-Cookieが返却された際、Domain=.localhost;に変更
      const setCookie = proxyRes.headers['set-cookie'] ?? undefined;
      if (setCookie) {
        const pattern = /Domain=\.[a-zA-Z0-9-]*\.cuculus\.jp;/;
        const cookies = [];
        setCookie.forEach((value) => {
          cookies.push(value.replace(pattern, `Domain=.${siteUrl.hostname};`));
        });
        proxyRes.headers['set-cookie'] = cookies;
      }
    },
  }),
);
proxy.listen(apiUrl.port, (err) => {
  if (err) throw err;
  console.log(`> Proxy server ready on http://localhost:${apiUrl.port}`);
});
