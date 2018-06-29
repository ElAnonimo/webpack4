import React from 'react'
import ReactDOM from 'react-dom'
// import Counter from './counter'
import AppRoot from './components/AppRoot'
import { AppContainer } from 'react-hot-loader'
import data from '../data/bio';

function render(Component) {
	// ReactDOM.hydrate() not ReactDOM.render() cause app.js is client side and we render html from server side.
	// ReactDOM.render() causes rerender, ReactDOM.hydrate() passes events and state w/o rerender
	ReactDOM.hydrate(
		<AppContainer>
			<Component data={data} />
		</AppContainer>,
		document.getElementById('react-root')
	)
}

/* render(Counter)

// webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./counter.js', () => {
		const NewCounter = require('./counter.js').default;
		render(NewCounter);
	})
} */

render(AppRoot)

// webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/AppRoot.js', () => {
		const NewAppRoot = require('./components/AppRoot.js').default;
		render(NewAppRoot);
	})
}
