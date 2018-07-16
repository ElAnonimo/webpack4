import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Provider } from 'react-redux'
// const AppRoot = require('../components/AppRoot').default
import Routes from '../components/Routes'
import store from '../store'

export default ({ clientStats }) => (req, res) => {
	// const html = ReactDOMServer.renderToString(<div>Hello SSR</div>);
	// res.send(html);
	const site = req.hostname.split('.')[0]
	const names = flushChunkNames().concat([`css/${site}-theme-css`])

	const context = { site }

	const app = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<Routes />
			</StaticRouter>
		</Provider>
	)

	const { js, styles, cssHash } = flushChunks(clientStats, {
		chunkNames: names
	})

	res.send(`
		<html>
			<head>
				<!-- <link href="/main.css" rel="stylesheet" /> -->
				${styles}
			</head>
			<body>
				<!-- <div id="react-root">$ --><!-- {ReactDOMServer.renderToString(<AppRoot />)}</div> -->
				<div id="react-root">${app}</div>
				<!-- <script src="main.bundle.js"></script> -->
				<!-- <script src="vendors~main.bundle.js"></script> -->
				${js}
				${cssHash}
			</body>
		</html>
	`);
}
