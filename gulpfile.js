var fs = require('fs');
try {
    var logo = fs.readFileSync('./logo', 'utf8');
    var bug = fs.readFileSync('./bug', 'utf8');
}
catch(e){
    logo = '';
    bug = '';
}

var defaultOptions = {
    default: {
        env: 'develop',
        config: './config.json',
        server: 'localhost:8085'
    }
};

//console parameters
var minimist = require('minimist');
var options = minimist(process.argv.slice(2), defaultOptions);


console.info('API HOST: ' + options.server);


var config = require(options.config);

if(config.isProduction)
    console.log('Production build');
else
    console.log('Develop build');

function wrapPipe(taskFn) {
    return function(done) {
        var onSuccess = function() {
            return done();
        };
        var onError = function(err) {
            if(bug) console.log(bug);
            console.log(err.toString());
            done(err);
        };
        var outStream = taskFn(onSuccess, onError);
        if(outStream && typeof outStream.on === 'function') {
            outStream.on('end', onSuccess);
        }
    }
}

var gulp = require('gulp');
var tasks = {};
var taskNames = Object.keys(config.tasks);
var taskFolder = './gulp';
for (var task_i=0; task_i < taskNames.length; task_i++){
    var _taskName = taskNames[task_i];
    tasks[_taskName] = require(taskFolder + '/' + _taskName + '.js');
    var parameters = config.tasks[_taskName];
    tasks[_taskName](gulp, parameters, config, wrapPipe);
}

if(config.watch === true){
    require(taskFolder + '/watch.js')(gulp, config.tasks)
}


gulp.task('default', ['build'], function () {
    gulp.start('watch');
    if(logo) console.log(logo);
});


