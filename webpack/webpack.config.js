require('babel-polyfill');

const loaders = require('./webpack.loaders.js');
const { PATHS, PROPS } = require('./webpack.constants.js');
const helpers = require('./webpack.helpers.js');
const plugins = require('./webpack.plugins.js');

module.exports = {
  mode: 'development',
  context: PATHS.contextPath,
  entry: helpers.getEntries(),
  output: {
    filename: '[name].[hash].js',
    path: PATHS.outputPath,
    publicPath: PATHS.publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  optimization: {
    minimize: PROPS.isProd,
    runtimeChunk: {
      name: 'vendor',
    },
    splitChunks: helpers.get_chunks_config()
  },
  module: {
    rules: [...loaders],
  },
  devtool: helpers.addSourceMap(),
  devServer: {
    hot: !PROPS.isProd
  },
  plugins: plugins,
};
