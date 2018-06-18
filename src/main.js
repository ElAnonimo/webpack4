require('babel-runtime/regenerator');										// turns Promises to Generators
// is sent to client. Accepts and reloads React component due to changes in project files, keeping its state
require('react-hot-loader/patch');
require('babel-register');															// allow for ES6 imports
require('webpack-hot-middleware/client?reload=true');		// this is sent to client to set up websocket connection
// require('./main.css');
// require('./main.sass');
// require('./main.less');
require('./main.styl');
require('./index.html');
require('./app');

// alert('test');

var a = async (args) => {
	const { a, b } = args;
	await console.log('Hello', a, b);
	console.log('Done');
};

a({ a: 1, b: 2 });

/*		babel-runtime/regenerator
Regenerator. (https://babeljs.io/docs/en/babel-plugin-transform-runtime)

Boolean, defaults to true. Toggles whether or not generator functions are transformed to use a regenerator runtime
that does not pollute the global scope. */
