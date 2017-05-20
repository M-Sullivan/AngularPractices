/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

var paths = {
    root:"./",
    index: "./index.html",
    sources: ["./Scripts/app/**/*.js"],
    dist: "./Scripts/dist",
    distSources: ["./Scripts/dist/app.min.js"]
};

gulp.task('scripts', function () {
    return gulp.src(paths.sources)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('bower', function () {
    gulp.src(paths.index)
      .pipe(wiredep({}))
      .pipe(gulp.dest(paths.root));
});
 
gulp.task('inject-own', function () {
    return gulp
        .src(paths.index) 
        .pipe(inject(gulp.src(paths.sources, { read: false })))
        .pipe(gulp.dest(paths.root));
});

gulp.task('default', ['scripts', 'bower', 'inject-own']);