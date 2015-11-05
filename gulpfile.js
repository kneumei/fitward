var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less');
  concat = require('gulp-concat');
  mainBowerFiles = require('main-bower-files');
  uglify = require('gulp-uglify');
  browserify = require('browserify');
  babel = require('babelify');
  buffer = require('vinyl-buffer');
  

gulp.task('less', function () {
  gulp.src('./app/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('js', function(){
  browserify( {entries: 'client.js', debug:true, basedir:'./app/js'})
    .transform(babel, {presets: ["es2015"]})
    .bundle()
    .on('error', function(err){ console.log(err.message); this.emit('end');})
    .pipe(source('app.js'))
    .pipe(buffer())    
    .pipe(gulp.dest('public/js'))
});

gulp.task('templates', function(){
  return gulp.src('./app/js/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('framework', function(){
  gulp.src(mainBowerFiles())
    .pipe(plumber())
    .pipe(concat('framework.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('watch', function() {
  gulp.watch('./app/less/*.less', ['less']);
  gulp.watch('./app/js/*.js', ['js'])
  gulp.watch('./app/js/*.html', ['templates'])
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'less',
  'js',
  'templates',
  'framework',
  'develop',
  'watch'
]);
