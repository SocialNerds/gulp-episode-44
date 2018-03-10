const gulp = require('gulp')
const loadPlugins = 'gulp-load-plugins'
const plugins = loadPlugins()

gulp.task('sass:dev', () => {
  return gulp.src('./styles/sass/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass.sync().on('error', plugins.sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./styles/css'))
    .pipe(plugins.livereload())
})

gulp.task('sass:prod', () => {
  return gulp.src('./styles/sass/*.scss')
    .pipe(plugins.sass.sync({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('js:dev', () => {
  return gulp.src('./js/*')
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.livereload())
})

gulp.task('js:prod', () => {
  return gulp.src('./public/js/*')
    .pipe(plugins.minify({
      ignoreFiles: ['jquery.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('image:optimize', () => {
  return gulp.src('assets/*')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('public/assets'))
})

gulp.task('default', () => {
  plugins.livereload.listen()
  gulp.watch('./styles/sass/*.scss', ['sass:dev'])
  gulp.watch('./js/*', ['js:dev'])
})
gulp.task('build', ['sass:prod', 'js:prod', 'image:optimize'])
