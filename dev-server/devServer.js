const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config');
const webpackHelpers = require('../webpack/webpack.helpers');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  clientLogLevel: 'error',
  inline: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
});

console.log('ENV: \r\n', webpackHelpers.get_envies());

app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(cookieParser());

app.get('*', (req, res) => {
  const reqPath = req.url;
  // find the file that the browser is looking for
  const reqPathArray = reqPath.split('/');
  const file = reqPathArray[reqPathArray.length - 1];
  if (['bundle.js', 'index.html'].indexOf(file) !== -1) {
    res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, file)));
  } else if (file.indexOf('.') === -1) {
    // if the url does not have an extension, assume they've navigated to something like /home and want index.html
    res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, 'index.html')));
  }
});

const host = webpackHelpers.getHost();
app.listen(...host, (err) => {
  console.log(`Server has been started at http://${host[1]}:${host[0]}/`);
  if (err) {
    console.error(err.message);
  }
});
