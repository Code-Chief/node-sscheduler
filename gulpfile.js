var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');


var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
});

gulp.task("default", ["build"], function () {
  return gulp.src('build/**/*')
    .pipe(sourcemaps.init())
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});