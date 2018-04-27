const path = require('path');
const glob = require('glob-all');

const { PROPS, PATHS, devEnv, prodEnv } = require('./webpack.constants.js');

const DashboardPlugin = require('webpack-dashboard/plugin');

const copyPathWeb = [
];

const helpers = {
  getProps() {
    return PROPS;
  },
  getEntries() {
    return PROPS.isProd
      ? {
        main: ['./src/index.js']
      }
      : [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=/__webpack_hmr&reload=false',
        './src/index.js',
      ]
    ;
  },
  addSourceMap() {
    return PROPS.isProd ? false : 'cheap-inline-module-source-map';
  },
  addHash(template, hash) {
    return PROPS.isProd 
      ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) 
      : `${template}?hash=[${hash}]`;
  },
  get_html_plugin_config() {
    return PROPS.isProd ? {
      inject: true,
      template: path.resolve(PATHS.srcPath, './index.html'),
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    } : {
      inject: true,
      template: path.resolve(PATHS.srcPath, './index.html'),
      chunksSortMode: 'dependency',
    };
  },
  get_minify_config() {
    return [
      {},
      {
        test: /\.js[x]?($|\?)/i
      }
    ];
  },
  get_extract_text_config() {
    return {
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            autoprefixer: false, 
            minimize: false
          },
        },
        {
          loader: 'sass-loader',
          options: {
            precision: 8
          }
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              path.resolve(__dirname, '../src/assets/css/const/**/*.scss')
            ]
          }
        },
        'postcss-loader'
      ],
    }; 
  },
  get_css_purify_config() {
    return {
      paths: glob.sync([
        path.join(PATHS.rootPath, 'src/**/*.html'),
        path.join(PATHS.rootPath, 'src/**/*.js'),
        path.join(PATHS.rootPath, 'src/**/*.jsx')
      ]),
      styleExtensions: ['.css'],
      moduleExtensions: ['.html', '.jsx', '.js'],
      purifyOptions: {
        minify: PROPS.isProd,
        whitelist: ['*[data-platform]*', '*[data-useragent]*'],
      }
    };
  },
  get_envies() {
    if (PROPS.isProd) {
      return { 'process.env': prodEnv };
    } 
    return { 'process.env': devEnv };
  },
  get_copy_paths() {
    return copyPathWeb;
  },
  get_clean_config() {
    return './build';
  },
  get_html_include_config() {
    return {
      assets: [ ],
      append: true,
    };
  },
  get_optimize_config() {
    return {
      sourceMap: false,
    };
  },
  get_matrix_dashboard() {
    if (PROPS.isMatrix) {
      return [new DashboardPlugin()];
    } 
    return [];
  },
  get_chunks_config() {
    return {
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          priority: -10,
          minSize: 1,
          enforce: true,
          reuseExistingChunk: true
        },
      },
    };
  },
  getHost() {
    return [
      PROPS.port, 
      'localhost'
    ];
  }
};

module.exports = helpers;
