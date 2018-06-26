const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = env => {
	return {
		entry: {
			main: [
				'babel-polyfill',
				'./src/main'
			],
			// babel-polyfill adds too much kB to outputted main.bundle.js
			// main: ['core-js/fn/promise', './src/main']
			// ts: './src/main'
		},
		resolve: {
			extensions: [".js", ".ts"]													// add extensions to entry files above
		},
		mode: 'production',
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, '../dist'),
			publicPath: '/'
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
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,				// won't work: no separate css file. Styles come from main.bundle.js
								minimize: true
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
			new OptimizeCssAssetsPlugin(),
			new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
			new HtmlWebpackPlugin({
				// template: './src/index.html',
				// ejs is default to HtmlWebpackPlugin, no ejs loader needed unlike with html-loader above
				// template: './src/index.ejs',
				// template: './src/index.pug',
				template: './src/index.hbs',
				inject: true,			// injects <script> tags to outputted dist/index.html
				title: 'Hello EJS'
			}),
			new webpack.DefinePlugin({
				'process.env': {
					// NODE_ENV: JSON.stringify('production')
					NODE_ENV: JSON.stringify(env.NODE_ENV)
				}
			}),
			// new MinifyPlugin()
			new UglifyJsPlugin(),
			new CompressionPlugin({
				algorithm: 'gzip'
			}),
			new BrotliPlugin()
		]
	}
};
