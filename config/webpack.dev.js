const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		main: [
			'babel-polyfill',
			'babel-runtime/regenerator',
			'webpack-hot-middleware/client?reload=true',
			'./src/main'
		],
		// babel-polyfill adds too much kB to outputted main.bundle.js
		// main: ['core-js/fn/promise', './src/main']
		// ts: './src/main'
	},
	resolve: {
		extensions: [".js", ".ts"]													// add extensions to entry files above
	},
	mode: 'development',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	devServer: {
		contentBase: 'dist',
		historyApiFallback: true,
		overlay: true,					// to display errors in the browser window
		hot: true,
		stats: {
			colors: true
		}
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{ loader: 'babel-loader' }
				],
				exclude: /node_modules/
			},
			{
				test: /\.ts$/,
				use: [
					{ loader: 'awesome-typescript-loader' }
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true				// won't work: no separate css file. Styles come from main.bundle.js
						}
					}
				]
			},
			{
				test: /\.sass$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.styl$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'stylus-loader' }
				]
			},
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'less-loader' }
				]
			},
			{
				test: /\.html$/,
				use: [
					// job of two below modules are done by HtmlWebpackPlugin
					/* {
						loader: 'file-loader',
						options: {
							name: '[name].html'			// output file name
						}
					},
					{	// extract-loader puts the tested /\.html$/ file to a separate file not adds it to main.bundle.js
						// extract loader parses the javascript back to an html file
						loader: 'extract-loader'
					}, */
					// html-loader was left cause it exports tested html file as JS code to src/main.js
					{
						loader: 'html-loader',		// exports tested html file to main.bundle.js as string and lints it
						options: {
							attrs: ['img:src']			// to add img:src to output file and require all images from its folder
						}
						// html template implicitly turns <img src='...' /> in .html page to <img src='require(src)' />
					}
				]
			},
			{
				test: /\.pug$/,
				use: [
					{ loader: 'pug-loader' }
				]
			},
			{
				test: /\.hbs$/,
				use: [
					{
						loader: 'handlebars-loader',
						query: {
							// hbs template implicitly turns <img src='...' /> in .hbs page to <img src='require(src)' />
							inlineRequires: '/images/'
						}
					}
				]
			},
			{
				test: /\.(png|svg|gif|jpe?g)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			// template: './src/index.html',
			// ejs is default to HtmlWebpackPlugin, no ejs loader needed unlike with html-loader above
			// template: './src/index.ejs',
			// template: './src/index.pug',
			template: './src/index.hbs',
			inject: true,			// injects <script> tags to outputted dist/index.html
			title: 'Hello EJS'
		})
	]
};
