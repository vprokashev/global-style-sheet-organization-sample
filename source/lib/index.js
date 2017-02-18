//https://github.com/ride-css/ride-css/tree/master/lib/ride-css/gs

var stylus = require('stylus');
// getting stylus helpers
var helpers = stylus.helpers;
// getting stylus nodes
var nodes = stylus.nodes;

// exporting the plugin
module.exports = function () {
    // returning function for use();
    return function ($stylus) {
        // Number functions
        // parse-float definition
        $stylus.define('log', log);
    }
};

function log(value){
    console.log(value);
}