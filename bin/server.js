import express from "express";
import path from "path";
import logger from "morgan";
import pug from "pug";
import webpack from "webpack";
import webpackConfig from "./webpack.config.babel";

const {NODE_ENV, API_URL, DEV_PORT, PUBLIC_PATH} = process.env;

const app = express();
const compiler = webpack(webpackConfig);

app.set('port', process.env.DEV_PORT);

app.disable('x-powered-by');

app.engine('pug', pug.__express);

app.set("views", path.join(__dirname, "..", "frontend/templates"));

app.use(require("webpack-dev-middleware")(compiler, {
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	noInfo: true,
	reload : true,
	index: "index.html",
	stats: {
		colors: true
	},
	reporter: null,
	serverSideRender: true
}));

app.use(require("webpack-hot-middleware")(compiler, {
	log: console.log,
	path: '/__webpack_hmr'
}));

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, webpackConfig.output.publicPath)));
app.use('/static', express.static(path.join(__dirname, '..', 'frontend/static')));

module.exports = app;
