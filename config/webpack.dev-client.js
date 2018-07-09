const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	name: 'client',
	entry: {
		vendor: ["react", "react-dom"],
		main: [
			// 'babel-polyfill',
			'react-hot-loader/patch',
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
		// filename: 'dev.client.bundle.js',
		filename: '[name].bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	devServer: {
		contentBase: 'dist',
		// historyApiFallback: true,
		overlay: true,					// to display errors in the browser window
		hot: true,
		stats: {
			colors: true
		}
	},
	/* optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					name: 'vendor',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	}, */
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
						// loader: MiniCssExtractPlugin.loader
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
							name: '[name].[ext]'			// output file name
						}
					},
					{	// extract-loader puts the tested /\.html$/ file to a separate file not adds it to main.bundle.js
						// extract loader parses the javascript back to an html file
						loader: 'extract-loader'
					}, */
					// html-loader was left cause it exports tested html file as JS code to src/main.js
					/* {
						loader: 'html-loader',		// exports tested html file to main.bundle.js as string and lints it
						options: {
							attrs: ['img:src']			// to add img:src to output file and require all images from its folder
						}
						// html template implicitly turns <img src='...' /> in .html page to <img src='require(src)' />
					} */
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
			},
			{
				test: /\.md$/,
				use: [
					// { loader: 'html-loader' },
					{ loader: 'markdown-with-front-matter-loader' }
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
				WEBPACK: true
			}
		}),
		// new MiniCssExtractPlugin({ filename: '[name].css' }),
		/* new HtmlWebpackPlugin({
			template: './src/index.html',
			// ejs is default to HtmlWebpackPlugin, no ejs loader needed unlike with html-loader above
			// template: './src/index.ejs',
			// template: './src/index.pug',
			// template: './src/index.hbs',
			inject: true,			// default. Injects <script> tags to outputted dist/index.html
			title: 'Hello EJS'
		}), */
		/* new BundleAnalyzerPlugin({
			generateStatsFile: true,
			analyzerMode: 'server',
			openAnalyzer: false
		}) */
		// new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
	]
};
