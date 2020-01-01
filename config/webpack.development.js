const { resolve,join } = require('path');
//更加友好的提示
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Jarvis = require('webpack-jarvis');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
	devtool: "eval-source-map",
	devServer: {
		host: 'localhost',
	  contentBase:join(__dirname,'../dist'),
		compress: true,
		open: true,
		hot: true,
		overlay: {
			errors: true,
			warnings: true
		},
		inline: true,
		quiet: true,
		disableHostCheck: true,
		publicPath: '/',
		historyApiFallback: true
	},
	plugins: [
		new Jarvis({ port:1337 }),
		new HtmlWebpackPlugin({
			title: "江湖人称李老板",
			filename: "index.html",
			template: resolve(__dirname, '../src/index-dev.html')
		}),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: ['You application is running here http://localhost:8080'],
				notes: ['Some additionnal notes to be displayed unpon successful compilation']
			},
			onErrors: function (severity, errors) {
				// You can listen to errors transformed and prioritized by the plugin
				// severity can be 'error' or 'warning'
			},
			clearConsole: true
		}),
		new WebpackBuildNotifierPlugin({
			title: "webpack构建完成",
			suppressSuccess: true
		})
	]
};
