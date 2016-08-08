module.exports = function(gulp, tasks, config, wrapPipe) {
    var es = require('event-stream');

    return gulp.task('copy', wrapPipe(function (success, error) {

        var taskNames = Object.keys(tasks);
        return es.merge(taskNames.map(
            function(taskName){
                return gulp.src(tasks[taskName]['src'])
                    .pipe(gulp.dest(tasks[taskName]['dst']))
            })
        );

    }));
};