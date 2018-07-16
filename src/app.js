import React from 'react'
import ReactDOM from 'react-dom'
// import Counter from './counter'
import AppRoot from './components/AppRoot'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'
import data from '../data/bio';
import { testAction } from './actions';

function render(Component) {
	// ReactDOM.hydrate() not ReactDOM.render() cause app.js is client side and we render html from server side.
	// ReactDOM.render() causes rerender, ReactDOM.hydrate() passes events and state w/o rerender
	ReactDOM.hydrate(
		<Provider store={store}>
			<AppContainer>
				<Component data={data} />
			</AppContainer>
		</Provider>,
		document.getElementById('react-root')
	)
}

store.dispatch(testAction('New title from action'))

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
