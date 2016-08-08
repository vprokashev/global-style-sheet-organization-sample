module.exports = function(gulp, tasks) {
    var watch = require('gulp-watch');

    gulp.task('watch', function () {

        for(var task_i=0; task_i<tasks['build'].length; task_i++) {
            var taskName = tasks['build'][task_i];
            if(taskName!=='copy') {
                var taskOptions = tasks[taskName];
                (function(_taskName){
                    watch(taskOptions.src, function () {
                        gulp.start(_taskName);
                    });
                })(taskName)
            } else {
                var underTasks = tasks['copy'];
                var underTaskNames = Object.keys(tasks['copy']);
                for (var underTask_i = 0; underTask_i < underTaskNames.length; underTask_i++){
                    var underTaskOptions = underTasks[underTaskNames[underTask_i]];
                    (function(_underTaskOptions){
                        watch(_underTaskOptions.src, function () {
                            gulp.start('copy');
                        });
                    })(underTaskOptions)
                }
            }
        }
    });
};