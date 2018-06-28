import express from 'express';
import webpack from 'webpack'
const expressStaticGzip = require('express-static-gzip')

const server = express()

import configDevClient from '../../config/webpack.dev-client'
import configDevServer from '../../config/webpack.dev-server'
import configProdClient from '../../config/webpack.prod-client'
import configProdServer from '../../config/webpack.prod-server'

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
	console.log('isDev');
	const compiler = webpack([configDevClient, configDevServer])

	const clientCompiler = compiler.compilers[0]
	const serverCompiler = compiler.compilers[1]

	const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, configDevClient.devServer)
	const webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler, configDevClient.devServer)

	server.use(webpackDevMiddleware)
	server.use(webpackHotMiddleware)
} else {
	console.log('isProd')
	// const staticMiddleware = express.static('dist')
	// server.use(staticMiddleware)
	// Heroku doesn't support gzip on Heroku server level so we send gzip from express
	// const expressStaticGzip = require('express-static-gzip')
	const render = require('./render')

	server.use(expressStaticGzip('dist', { enableBrotli: true }))

	server.use(render());
}

const port = process.env.PORT || 8080

server.listen(port, () => console.log(`Server's running on http://localhost:${port}.`));
