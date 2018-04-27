const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack'); 
const OptimizeJsPlugin = require('optimize-js-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const helpers = require('./webpack.helpers.js');

const defaultPlugins = [
  ...helpers.get_matrix_dashboard(),
  new webpack.DefinePlugin(helpers.get_envies()),
  new CopyWebpackPlugin(helpers.get_copy_paths()),
  new CleanWebpackPlugin(helpers.get_clean_config(), { root: process.cwd() }),
  new ExtractTextPlugin('[name].[hash].css'),
  new HtmlWebpackPlugin(helpers.get_html_plugin_config()),
];

const productionPlugins = [
  ...defaultPlugins,
  new OptimizeJsPlugin(helpers.get_optimize_config()),
  new PurifyCSSPlugin(helpers.get_css_purify_config()),
  new MinifyPlugin(...helpers.get_minify_config())
];

const developmentPlugins = [
  ...defaultPlugins,
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
];

if (helpers.isProduction) {
  module.exports = productionPlugins;
} else {
  module.exports = developmentPlugins;
}
