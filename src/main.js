// require('babel-runtime/regenerator');						// turns Promises to Generators. Moved to webpack.dev-client.js
// is sent to client. Accepts and reloads React component due to changes in project files, keeping its state
// require('react-hot-loader/patch');
// require('babel-register');													// allow for ES6 imports
// this is sent to client to set up websocket connection. Moved to webpack.dev.js
// require('webpack-hot-middleware/client?reload=true');
require('./main.css');
require('./nav.css');
// require('./main.sass');
// require('./main.less');
// require('./main.styl');
// require('./index.html');
require('./app');

// alert('test');
console.log(`Environment is ${process.env.NODE_ENV}`);

var a = async (args) => {
	const { a, b } = args;
	await console.log('Hello', a, b);
	console.log('Done');
};

a({ a: 1, b: 2 });

/*		babel-runtime/regenerator
Regenerator. (https://babeljs.io/docs/en/babel-plugin-transform-runtime)

Boolean, defaults to true. Toggles whether or not generator functions are transformed to use a regenerator
runtime that does not pollute the global scope. */

const globalVar = true;
const something = function(someArg) {
	const longVarName = someArg;
	const result = function(longVarName) {
		return longVarName * longVarName + globalVar
	};
	console.log('result:', result);
};
