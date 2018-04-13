const fs = require('fs');
const path = require('path');
const glob = require('glob');
const babel = require('babel-core');

fs.copyFileSync(
  path.resolve(__dirname, '../.lessrc'),
  path.resolve(__dirname, '../node_modules/antd/.lessrc'),
);

fs.copyFileSync(
  path.resolve(__dirname, '../.babelrc'),
  path.resolve(__dirname, '../node_modules/ant-design-pro/.babelrc'),
);

fs.copyFileSync(
  path.resolve(__dirname, '../.postcssrc'),
  path.resolve(__dirname, '../node_modules/ant-design-pro/.postcssrc'),
);

// 下面的代码是我深恶痛绝 antd-pro 之后写出的
const antdProSrcDirPath = path.resolve(__dirname, '../node_modules/ant-design-pro/es');

glob(`${antdProSrcDirPath}/**/*.less`, {}, function(er, lessFiles) {
  lessFiles.forEach(lessFile => {
    let content = fs.readFileSync(lessFile).toString();
    content = content.replace(
      /^@import "~antd\/lib\/(.+?)\.less";$/m,
      '@import "node_modules/antd/es/$1.less";',
    );
    fs.writeFileSync(lessFile, content);
  });
});

glob(`${antdProSrcDirPath}/**/*.js`, {}, function(er, jsFiles) {
  jsFiles.forEach(jsFile => {
    fs.writeFileSync(
      jsFile,
      babel.transform(fs.readFileSync(jsFile).toString(), {
        babelrc: false,
        presets: ['env', 'react', 'stage-2'],
        plugins: [
          ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
          'transform-decorators-legacy',
        ],
      }).code,
    );
  });
});
