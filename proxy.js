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
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );

  // users/*へのリクエストをプロキシする
  server.use(
    '/users/*',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );

  // nodeinfo/*へのリクエストをプロキシする
  server.use(
    '/nodeinfo/*',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );

  // inboxへのリクエストをプロキシする
  server.use(
    '/inbox',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
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
      proxyReq.setHeader('host', 'localhost');
    },
    onProxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      // Set-Cookieが返却された際、Domain=.localhost;に変更
      const setCookie = proxyRes.headers['set-cookie'] ?? undefined;
      if (setCookie) {
        const pattern = /Domain=\.[a-zA-Z0-9-]*\.cuculus\.jp;/;
        const cookies = [];
        setCookie.forEach((value) => {
          cookies.push(value.replace(pattern, 'Domain=.localhost;'));
        });
        proxyRes.headers['set-cookie'] = cookies;
      }
    },
  }),
);
proxy.listen(8080, (err) => {
  if (err) throw err;
  console.log('> Proxy server ready on http://localhost:8080');
});
