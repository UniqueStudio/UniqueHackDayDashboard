const path = require('path');

const paths = {
  appBuild: path.resolve(__dirname, '../dist'),
  appPublic: config.output.publicPath,
  appPackageJson: path.resolve(__dirname, '../package.json'),
  yarnLockFile: path.resolve(__dirname, '../yarn.lock'),
};
