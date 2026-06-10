const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');


module.exports = () => {
	const env = dotenv.config().parsed;
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});
	return {
		entry: "/src/index.js",
		output: {

			path: path.join(__dirname, "/dist"), // the bundle output path
			filename: "bundle.js", // the name of the bundle
		},
		devtool: "eval-cheap-source-map",
		devServer: {
			port: 3000, // you can change the port
			historyApiFallback: { index: "/", disableDotRule: true },
			// contentBase: path.join(__dirname, 'public'),
			// compress: true,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/, // .js and .jsx files
					exclude: /node_modules/, // excluding the node_modules folder
					use: {
						loader: "babel-loader",
					},
				},
				{
					test: /\.(less|css)$/,
					use: ['style-loader', 'css-loader', 'less-loader']
				},
				//   {
				//     test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				//     loader: "url-loader",
				//     options: {
				// 		limit: 8000, // Convert images < 8kb to base64 strings
				// 		name: 'images/[hash]-[name].[ext]'
				// 	}
				//   },
				{
					test: /\.(png|jpe?g|gif)$/i,
					loader: 'file-loader',
					options: {
						outputPath: 'images',
					},
				},
				{
					test: /.node$/,
					use: 'node-loader'
				},
				{
					test: /\.xlsx$/i,
					loader: 'url-loader'
				},
				// {
				// 	test: /\.svg$/i,
				// 	issuer: /\.[jt]sx?$/,
				// 	use: ['@svgr/webpack'],
				// },
				{
					test: /\.svg$/,
					use: [
						{
							loader: 'svg-url-loader',
							options: {
								limit: 10000,
							},
						},
					],
				},
				// {
				// 	test: /\.scss$/,
				// 	use: [
				// 	  {
				// 		loader: "style-loader"
				// 	  },
				// 	  {
				// 		loader: "css-loader"
				// 	  },
				// 	  {
				// 		loader: "sass-loader",

				// 	  }
				// 	]
				//   }
				{
					test: /\.scss$/i,
					exclude: /\.module\.scss$/i,
					use: [
						{
							loader: "style-loader",
						},
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								modules: {
									mode: "icss",
								},
							},
						},
						{
							loader: "sass-loader",
						},
					],
				},
				// --------
				// SCSS MODULES
				{
					test: /\.module\.scss$/i,
					use: [
						{
							loader: "style-loader",
						},
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								modules: {
									mode: "local",
								},
							},
						},
						{
							loader: "sass-loader",
						},
					],
				},


			],
		},
		plugins: [
			// add the plugin to your plugins array
			new webpack.DefinePlugin(envKeys),
			new HtmlWebpackPlugin({
				template: "public/index.html", // to import index.html file inside index.js
			}),
			new ESLintPlugin(),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'public', 'static/btob'),
						to: path.join(__dirname, 'dist', 'static/btob'),
						noErrorOnMissing: true
					},
					{
						from: path.resolve(__dirname, 'public', 'static/illustrations'),
						to: path.join(__dirname, 'dist', 'static/illustrations'),
						noErrorOnMissing: true
					}
				]
			})
		],
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
    	}
};
};