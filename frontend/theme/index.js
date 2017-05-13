
var stylus = require('stylus'),
	path = require('path'),
	nodes = stylus.nodes,
	utils = stylus.utils;

exports = module.exports = plugin;
exports.path = __dirname;

function plugin() {
	return function(style){
		console.log(`stylus plugin: ${__dirname}`);
		style.include(__dirname);
	};
}