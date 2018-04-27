const path = require('path');

const isMatrix = process.env.MATRIX || false;
const node_env = process.env.NODE_ENV || 'development';
const api_url = process.env.API_URL;
const port = (process.argv.find(arg => arg.slice(0, 7) === '--port=') || '=').split('=')[1] || 3003;
const isMock = process.argv.includes('--mock');

const devEnv = {
  NODE_ENV: JSON.stringify(node_env),
  IS_DEV: true,
  API_URL: JSON.stringify(api_url || `http://localhost:${port}/api`)
};

const prodEnv = {
  NODE_ENV: JSON.stringify(node_env),
  API_URL: JSON.stringify(api_url || 'https://fd.realapi.com/api'),
};

const rootPath = process.cwd();

const PATHS = {
  rootPath: rootPath,
  contextPath: rootPath,
  indexPath: path.resolve(rootPath, './src/index.js'),
  indexHtmlPath: path.resolve(rootPath, './src/index.html'),
  outputPath: path.resolve(rootPath, './build'),
  srcPath: path.resolve(rootPath, './src'),
  publicPath: '/'
};

const PROPS = {
  port,
  isMatrix,
  isMock,
  isProd: node_env !== 'development',
  node_env
};

module.exports.PATHS = PATHS;
module.exports.PROPS = PROPS;
module.exports.devEnv = devEnv;
module.exports.prodEnv = prodEnv;
