import express from 'express';
import path from 'path';

const server = express()

const webpack = require('webpack')
const config = require('../../config/webpack.dev')
const compiler = webpack(config)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer)
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, config.devServer)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)

const staticMiddleware = express.static('dist')
server.use(staticMiddleware)

const port = process.env.PORT || 8080

server.listen(port, () => console.log(`Server's running on http://localhost:${port}.`));
