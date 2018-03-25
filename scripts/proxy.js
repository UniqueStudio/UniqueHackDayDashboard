process.env.NODE_ENV = 'development';
const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('index.html');

const app = express();

app.use(
  '/',
  proxy(pathname => pathname.indexOf('/v1/') >= 0, {
    target: 'https://backend.fredliang.cn/',
  }),
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 3000));
