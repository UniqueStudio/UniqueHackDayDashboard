const path = require('path');
const paths = {
  appBuild: path.resolve(__dirname, '../build'),
  appPublic:
    process.env.CI === 'true' && process.env.NODE_ENV === 'production'
      ? 'https://console.fredliang.cn/prod/'
      : '/',
  appPackageJson: path.resolve(__dirname, '../package.json'),
  yarnLockFile: path.resolve(__dirname, '../yarn.lock'),
};
module.exports = paths;
