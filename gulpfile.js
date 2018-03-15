var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
});

gulp.task("es5", ["build"], function () {
  return gulp.src('build/**/*')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('es5'));
});

gulp.task("default", ["es5"],function () {
  return gulp.src('es5/**/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify({mangle: true}))
    .pipe(sourcemaps.write('.'))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest("dist"));
});