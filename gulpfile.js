const {task, series, parallel, watch, src, dest} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const twig = require('gulp-twig');

task('twig', function () {
  return src(['./app/pages/*.twig'])
    .pipe(twig())
    .pipe(dest('dist'));
});

task('js', function () {
  return src('app/js/**')
    .pipe(dest('dist/assets/js'));
});

task('section-js', function () {
  return src('app/sections/**/*.js')
    .pipe(dest('dist/assets/js/sections'))
});

task('section-sass', function () {
  return src('app/sections/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(dest('dist/assets/css/sections'))
});

task('sass', function () {
  return src('app/scss/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(dest('dist/assets/css'))
});

task('images', function () {
  return src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(dest('dist/assets/images'))
});

task('fonts', function () {
  return src('app/fonts/**/*')
    .pipe(dest('dist/assets/fonts'))
})

task('watch', function () {
  watch('app/scss/**/*.scss', {events: 'all'}, series(['sass', 'reload']));
  watch('app/sections/**/*.scss', {events: 'all'}, series(['section-sass', 'reload']));
  watch('app/js/**/*.js', {events: 'all'}, series(['js', 'reload']));
  watch('app/js/*.js', {events: 'all'}, series(['js', 'reload']));
  watch('app/sections/**/*.js', {events: 'all'}, series(['section-js', 'reload']));
  watch('app/pages/*.twig', {events: 'all'}, series(['twig', 'reload']));
  watch('app/layouts/*.twig', {events: 'all'}, series(['twig', 'reload']));
  watch('app/sections/**/*.twig', {events: 'all'}, series(['twig', 'reload']));
  // watch('dist/*.html', browserSync.reload);
  // watch('dist/js/**/*.js', browserSync.reload);

});

task('reload', function (done) {
  browserSync.reload();
  done();
});

task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 1986,
    notify: false,
  });
});

task('clean', function (done) {
  del.sync('dist');
  done();
});

task('build', series(['clean', 'twig', 'sass', 'section-sass', 'js', 'section-js', 'images', 'fonts']), function () {
  console.log('Building files');
})

task('default', parallel(['clean', 'twig', 'sass', 'section-sass', 'js', 'section-js', 'images', 'fonts', 'browserSync', 'watch']), function (done) {
  done();
});
