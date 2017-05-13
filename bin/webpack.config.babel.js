import webpack from "webpack";
import path from "path";
import _ from "lodash";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CommonsChunkPlugin from "webpack/lib/optimize/CommonsChunkPlugin";
import ManifestPlugin from "webpack-manifest-plugin";
import ChunkManifestPlugin from "chunk-manifest-webpack-plugin";
import WebpackChunkHash from "webpack-chunk-hash";

const {NODE_ENV, API_URL, DEV_PORT, PUBLIC_PATH} = process.env;

console.log("webpack env:");
console.log(`NODE_ENV ->  ${NODE_ENV}`);
console.log(`API_URL ->  ${API_URL}`);
console.log(`DEV_PORT ->  ${DEV_PORT}`);
console.log(`PUBLIC_PATH ->  ${PUBLIC_PATH}`);

const paths = {
	frontend: path.join(__dirname, '../frontend'),
	static: path.join(__dirname, '../frontend/static'),
	templateIndex: path.join(__dirname, '../frontend/templates/index.pug')
};

const appEntry = [
	`webpack-hot-middleware/client?http://0.0.0.0:${DEV_PORT}`,
	"babel-polyfill",
	"./index.js"
];

const vendorEntry = [

];

const plugins = [
	new webpack.DefinePlugin({
		"global.IS_BROWSER": true,
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			API_URL: JSON.stringify(process.env.API_URL),
			DEV_PORT: JSON.stringify(process.env.DEV_PORT),
			SYSTEM_DATE_FORMAT: JSON.stringify(process.env.SYSTEM_DATE_FORMAT)
		}
	}),
	new CommonsChunkPlugin({
		filename: '[name].js',
		names: ['app'/*, 'vendor'*/],
		minChunks: Infinity
	}),
	new WebpackChunkHash(),
	new ManifestPlugin({
		fileName: 'chunk-manifest.json',
		basePath: '/'
	}),
	new ChunkManifestPlugin({
		filename: "chunk-manifest.json",
		manifestVariable: "webpackManifest"
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: paths.templateIndex
	}),
	new webpack.LoaderOptionsPlugin({
		test: /\.styl$/,
			stylus: {
				default: {
					import: ["../frontend/theme/index.styl"],
					preferPathResolver: 'webpack'
				}
			}
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
];

const config = {
	context: paths.frontend,
	name: 'app',
	entry: {
		app: appEntry,
		//vendor: vendorEntry
	},
	output: {
		filename: '[name].js',
		publicPath: PUBLIC_PATH,
		path: PUBLIC_PATH
	},
	node: {
		net: 'empty',
		fs: 'empty'
	},
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					'babel-loader'
				],
				exclude: /node_modules/
			}, {
				test: /\.(jade|pug)$/,
				use: [
					'pug-loader'
				],
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}, {
				test: /\.styl$/,
				use: [
					"style-loader",
					"css-loader",
					"stylus-loader"
				]
			}, {
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader'
			}, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?name=/static/fonts/[name].[ext]?&limit=10000&minetype=application/font-woff',
			}, {
				test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=/static/fonts/[name].[ext]',
			}, {
				test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=/static/svg/[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: plugins
};

export { config };
export default config;