// const Bundler = require('parcel-bundler');
// const serve = require('browser-sync');
// const proxy = require('http-proxy-middleware');

// const bundler = new Bundler('index.html');
// serve({
//   port: process.env.PORT || 3000,
//   open: false,
//   server: { baseDir: 'dist', https: true },
//   middleware: [
//     proxy(pathname => pathname.indexOf('/v1/') >= 0, { target: 'http://192.168.1.165:8000/' }),
//     bundler.middleware(),
//   ],
// });

const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('index.html');

const app = express();

app.use(
  '/',
  proxy(pathname => pathname.indexOf('/v1/') >= 0, {
    target: 'http://localhost:8000/',
  }),
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 3000));
