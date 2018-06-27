import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AppRoot from '../components/AppRoot';

const server = express()

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
	const webpack = require('webpack')
	const config = require('../../config/webpack.dev')
	const compiler = webpack(config)

	const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer)
	const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, config.devServer)

	server.use(webpackDevMiddleware)
	server.use(webpackHotMiddleware)
}

// const staticMiddleware = express.static('dist')
// server.use(staticMiddleware)
// Heroku doesn't support gzip on Heroku server level so we send gzip from express
const expressStaticGzip = require('express-static-gzip')
server.use(expressStaticGzip('dist', { enableBrotli: true }))

server.get('*', (req, res) => {
	// const html = ReactDOMServer.renderToString(<div>Hello SSR</div>);
	// res.send(html);
	res.send(`
		<html>
			<head>
				<link href="/main.css" rel="stylesheet" />
			</head>
			<body>
				<div id="react-root"><p>${ReactDOMServer.renderToString(<AppRoot />)}</p></div>
				<script src="main.bundle.js"></script>
				<script src="vendors~main.bundle.js"></script>
			</body>
		</html>
	`);
});

const port = process.env.PORT || 8080

server.listen(port, () => console.log(`Server's running on http://localhost:${port}.`));
