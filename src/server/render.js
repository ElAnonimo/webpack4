import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks';
// const AppRoot = require('../components/AppRoot').default;
import Routes from '../components/Routes';

export default ({ clientStats }) => (req, res) => {
	// const html = ReactDOMServer.renderToString(<div>Hello SSR</div>);
	// res.send(html);
	const { js, styles } = flushChunks(clientStats, {
		chunkNames: flushChunkNames()
	})

	res.send(`
		<html>
			<head>
				<!-- <link href="/main.css" rel="stylesheet" /> -->
				${styles}
			</head>
			<body>
				<!-- <div id="react-root">${ReactDOMServer.renderToString(<AppRoot />)}</div> -->
				<div id="react-root">
					${ReactDOMServer.renderToString(
						<StaticRouter location={req.url} context={{}}><Routes /></StaticRouter>
					)}
				</div>
				<!-- <script src="main.bundle.js"></script> -->
				<!-- <script src="vendors~main.bundle.js"></script> -->
				${js}
			</body>
		</html>
	`);
}
