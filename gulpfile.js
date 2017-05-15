var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
//var $ = require('gulp-load-plugins')();
var colors = require('colors');
var runSequence = require('run-sequence');
var through = require('through2');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var spritesmith = require('gulp.spritesmith');
var del = require('del');
var less = require('gulp-less');
var watch = require('gulp-watch');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-express');
var connect = require('gulp-connect');


var CONFIG = {
   isDebug: false,
   isPreview: false,
   isDeploy: false
};

gulp.task('sprite', function(cb) {
   var spriteOptions = require('./gulp/options/sprites')();
   var item = {}, spriteData = null;
   Object.keys(spriteOptions).map(function(key, index) {
      item = spriteOptions[key];
      // console.log('------------------------------------------------');
      // console.log(item);
      spriteData = gulp.src(item.src)
                       .pipe(spritesmith(item))
                       .pipe(gulp.dest('./'));
   });

   return spriteData;
});

var AUTOPREFIXER_BROWSERS = [
   'ie >= 6',
   'ie_mob >= 6',
   'ff >= 30',
   'chrome >= 34',
   'safari >= 7',
   'opera >= 23',
   'ios >= 7',
   'android >= 4.4',
   'bb >= 10'
];

gulp.task('less', function() {
   return gulp.src('public/less/**/*.less')
               .pipe(less({
                  modifyVars: {
                     // 'imgPath': '"/image"'
                  }
               }))
               // .pipe(sourcemaps.init())
               .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
               // .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('style'))
               .pipe(connect.reload());
});

gulp.task('webpack', function() {
   //console.log(require('./public/script/index.js'));
   return gulp.src('public/script/**/*.js')
              .pipe(named())
              .pipe(webpack(require('./webpack.config.js')))
              .pipe(gulp.dest('public/script/dest/'))
              .pipe(connect.reload());
});

gulp.task('watch', function () {
   gulp.watch('public/less/**/*.less', ['less']);
   gulp.watch(['public/script/**/*.@(js|handlebars)', '!public/script/dest/**/*.js'], ['webpack']);
});

gulp.task('webserver:dev', function() {
   server.run(['app.js']);
});


gulp.task('clean', function (cb) {
   return del([
      'public/image/sprites/**',
      'public/less/sprite/**',
      'public/style/**',
      'public/script/dest/**'
   ], {force: true}, cb);
});

gulp.task('dev', function (done) {
   CONFIG['isDebug'] = true;
   runSequence(
      'clean',
      'less',
      'webserver:dev',
      'webpack',
      'watch',
   done);
});
