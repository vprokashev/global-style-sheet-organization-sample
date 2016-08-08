module.exports = function(gulp, options, config, wrapPipe) {
    var clean = require('gulp-clean');

    return gulp.task('clean', function(){
        return gulp.src(options['src'])
            .pipe(clean({force: true}));
    });
};