//https://github.com/ride-css/ride-css/tree/master/lib/ride-css/gs

var stylus = require('stylus');
var helpers = stylus.helpers;
var nodes = stylus.nodes;

// exporting the plugin
module.exports = function () {
    // returning function for use();
    return function ($stylus) {
        // Number functions
        // parse-float definition
        $stylus.define('$m-log', log);
        $stylus.define('$m-random-color', getRandomColor);
    }
};

function log(value){
    console.log(value);
}

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	let i = 0;
	for (i; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}