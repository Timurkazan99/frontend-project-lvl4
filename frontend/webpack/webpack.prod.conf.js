/* Build config:
  ========================================================================== */

// Source: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge');
// Base config
const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [],
});

/* eslint-disable no-unused-vars */
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
/* eslint-enable no-unused-vars */
