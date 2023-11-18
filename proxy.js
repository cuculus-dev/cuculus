const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.STAGE !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Next.js を localhost:3000 で起動
app.prepare().then(() => {
  const server = express();
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
    },
  }),
);
proxy.listen(8080, (err) => {
  if (err) throw err;
  console.log('> Proxy server ready on http://localhost:8080');
});
