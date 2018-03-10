const gulp = require('gulp');
const markdownpdf = require('gulp-markdown-pdf');
const concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src('path/*.md')
    .pipe(concat('output.pdf'))
    .pipe(markdownpdf())
    .pipe(gulp.dest('dist'));
});