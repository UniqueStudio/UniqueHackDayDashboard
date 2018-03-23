process.env.NODE_ENV = 'development';
const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('index.html');

const app = express();

app.post('/v1/file/files', (req, res) => {
  req.on('data', () => console.log('...'));
  req.on('end', () =>
    res.json({
      message: 'Success',
      fileId: '111111111',
    }),
  );
});

app.use(
  '/',
  proxy(pathname => pathname.indexOf('/v1/') >= 0, {
    target: 'http://192.168.1.165:8000/',
  }),
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 3000));
