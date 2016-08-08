module.exports = function(gulp, options, config, wrapPipe) {
    var gulpsync = require('gulp-sync')(gulp);
    return gulp.task('rebuild', gulpsync.sync(options));
};