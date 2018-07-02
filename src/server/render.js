import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router'
// const AppRoot = require('../components/AppRoot').default;
import Routes from '../components/Routes';

export default () => (req, res) => {
	// const html = ReactDOMServer.renderToString(<div>Hello SSR</div>);
	// res.send(html);
	res.send(`
		<html>
			<head>
				<link href="/main.css" rel="stylesheet" />
			</head>
			<body>
				<!-- <div id="react-root">${ReactDOMServer.renderToString(<AppRoot />)}</div> -->
				<div id="react-root">
					${ReactDOMServer.renderToString(
						<StaticRouter location={req.url} context={{}}><Routes /></StaticRouter>
					)}
				</div>
				<script src="main.bundle.js"></script>
				<script src="vendors~main.bundle.js"></script>
			</body>
		</html>
	`);
}
