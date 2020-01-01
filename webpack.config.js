const webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve, join } = require('path');
const progressBarPlugin = require('progress-bar-webpack-plugin'); //webpack编译进度条
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将css文件单独提取出来
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';  //获取环境变量，判断是开发还是生产环境
const _isDev = _mode === 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const env = require('./config/env.js')[_mode];
const cssLoaders = require('./config/cssLoader.js');

const baseCssLoaders = _isDev ? ['style-loader'] : [MiniCssExtractPlugin.loader];

const imagesLoaders = [
	{
		loader: 'url-loader',
		options: {
			limit: 10 * 1024,
			name: _isDev ? 'images/[name].[ext]' : 'images/[name].[hash:5].[ext]',
			publicPath: env.publicPath
		}
	}
];

const baseConfig = {
	mode: _mode,
	target: "web",
	entry: {
		app: join(__dirname, "./src/index.jsx")
	},
	output: {
		path: join(__dirname, 'dist'),
		filename: _isDev ? "scripts/[name].js" : "scripts/[name].[chunkhash:5].js",
		publicPath: env.publicPath
	},
	resolve: {
		extensions: ['.jsx', '.js'],
		alias: {
			'@pages': resolve(__dirname, './src/pages'),
			'@components': resolve(__dirname, './src/components'),
			'@images': resolve(__dirname, './src/assets/images'),
		},
		modules: [resolve('src'), 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				include: [resolve("src")],
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					//开发环境不启用路由拆分
					plugins: _isDev ? ['dynamic-import-node'] : []
				}
			},
			{
				test: /.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
				use: imagesLoaders
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10 * 1024,
					name: _isDev ? 'medias/[name].[ext]' : 'medias/[name].[hash:5].[ext]',
					publicPath: env.publicPath
				}
			},
			{
				test: /\.(html|htm)/,
				loader: 'html-withimg-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					...baseCssLoaders,
					...cssLoaders
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(_mode),
		}),
		new progressBarPlugin(),
	]
};

module.exports = merge(baseConfig, _mergeConfig);
