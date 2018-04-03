const path = require('path');
// const config = require('../webpack.config.prod');
const paths = {
  appBuild: path.resolve(__dirname, '../build'),
  appPublic: 'https://console.fredliang.cn/prod/',
  appPackageJson: path.resolve(__dirname, '../package.json'),
  yarnLockFile: path.resolve(__dirname, '../yarn.lock'),
};
module.exports = paths;
