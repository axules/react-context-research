const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { PATHS } = require('./webpack.constants.js');
const helpers = require('./webpack.helpers.js');

module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    include: PATHS.srcPath,
    exclude: [/node_modules/, /__tests__/, /seo/],
    enforce: 'pre',
  },
  {
    test: /\.jsx?$/, 
    loader: 'babel-loader', 
    include: PATHS.srcPath,
    exclude: [/node_modules/, /__tests__/, /seo/],
  },
  {
    test: /\.(css|scss)$/, 
    loader: ExtractTextPlugin.extract(helpers.get_extract_text_config()),
  },
  {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file',
    query: {
      name: helpers.addHash('assets/[name].[ext]', 'hash'),
    },
  },
  {
    test: /\d{3}\.html$/,
    loader: 'html',
    query: {
      name: '[name].[ext]',
    },
  },
  {
    test: /\.json$/,
    loader: 'json'
  }
];

