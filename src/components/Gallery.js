import React from 'react'

const getBundle = () => {
	// babel-plugin-syntax-dynamic-import allows for import calls anywhere in the code
	// stuff inside /* ... */ is magic comments. They define [name] in chunkFilename in output in webpack.dev-client.js
	// babel-plugin-universal-import removes the need for magic comments, it adds the webpackChunkName chunk name
	// import(/* webpackChunkName: 'lodash' */ 'lodash').then(_ => {
	import('lodash').then(_ => {
		console.log('lodash imported:', _)
	})
}

export default () => (
	<div>
		<h1 onClick={getBundle}>Gallery</h1>
	</div>
)
