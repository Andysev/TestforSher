const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const browsersync = require("browser-sync");
browserSync = require('browser-sync');
const pug = require('gulp-pug');
const dist = "./dist";

gulp.task("pug", function(){
  return gulp.src('./src/*.pug')
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('src'));
});
gulp.task("copy-html", () => {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task('build-js', function(){
  return gulp.src("./src/js/main.js")
  .pipe(gulp.dest(dist + '/js'))
  .pipe(browsersync.stream());
	});

  gulp.task("copy-assets", () => {
    gulp.src("./src/icons/**/*.*")
        .pipe(gulp.dest(dist + "/icons"));
   
    return gulp.src("./src/img/**/*.*")
        .pipe(gulp.dest(dist + "/img"))
        .pipe(browsersync.stream());
    
  });

  gulp.task("build-sass", () => {
    return gulp.src("./src/scss/**/*.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(gulp.dest(dist + '/css'))
      .pipe(browsersync.stream());
  });
gulp.task('watch', function(){
  
    gulp.watch("./src/*.pug", gulp.parallel('pug'));
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/icons/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/img/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
	});
  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: "dist/"
      }
      });
    });
  
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-sass", "build-js"));

gulp.task("prod", () => {
  gulp.src("./src/index.html")
      .pipe(gulp.dest(dist));
  gulp.src("./src/img/**/*.*")
      .pipe(gulp.dest(dist + "/img"));
  gulp.src("./src/icons/**/*.*")
      .pipe(gulp.dest(dist + "/icons"));
  gulp.src("./src/js/main.js")
      .pipe(gulp.dest(dist + '/js'));
  
  return gulp.src("./src/scss/style.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(cleanCSS())
      .pipe(gulp.dest(dist + '/css'));
});

gulp.task('default', gulp.parallel('watch', 'build', 'browser-sync'));