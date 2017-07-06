var gulp = require('gulp');
// var htmlmin = require('gulp-htmlmin');
var fileInline = require('gulp-file-inline');
var inline = require('gulp-inline');
var autoprefixer = require('gulp-autoprefixer'); //used with gulp-inline
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');

gulp.task('minify-css', function() {
  return gulp.src('src/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

// gulp.task('minify-html', function() {
//   return gulp.src('src/**/*.html')
//     .pipe(fileInline({
//       css: {
//         tagPattern: fileInline.CSS_TAG_PATTERN,
//         urlPattern: fileInline.CSS_HREF_PATTERN,
//         tagParser: fileInline.cssTagParser,
//         parser: fileInline.cssParser,
//         filter: function(tag){
//           return !(tag.indexOf('media') > 0);
//         },
//         minify: true
//     },
//     js: {
//           filter: function(tag) {
//               return tag.indexOf(' data-inline="true"') > 0;
//           }
//         }
//     }))
//     .pipe(htmlmin({collapseWhitespace: true,minifyCSS: true,minifyJS: true,removeComments: true}))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('uglify-js', function (cb) {
  pump([
        gulp.src('src/**/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('images', function(){
  return gulp.src('src/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist'))
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.{css,js,html}', ['build']);
});

gulp.task('build', ['minify-css', 'uglify-js']);
