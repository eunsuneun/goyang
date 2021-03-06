const gulp = require("gulp");
const { series, parallel } = require("gulp");
const del = require("del");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const minifyCSS = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const image = require("gulp-image");
const bro = require("gulp-bro");
const babelify = require("babelify");
var ghPages = require("gulp-gh-pages");

// 경로
const routes = {
  pug: {
    watch: "src/templates/**/*.pug",
    src: "src/templates/*.pug",
    dest: "build",
  },
  img: {
    src: "src/img/**/*",
    dest: "build/img",
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/*.scss",
    dest: "build/css",
  },
  css: {
    src: "src/css/*",
    dest: "build/css",
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/**/*.js",
    dest: "build/js",
  },
};

// clean build folder
function clean() {
  return del(["build"]);
}

// build images
function img() {
  return gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));
}

// compile pug into html
function html() {
  return gulp.src(routes.pug.src).pipe(pug()).pipe(gulp.dest(routes.pug.dest));
}

// compile scss into css
function style() {
  return gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(routes.scss.dest))
    .pipe(browserSync.stream());
}

// library css
function css() {
  return gulp.src(routes.css.src).pipe(minifyCSS()).pipe(gulp.dest(routes.css.dest));
}

// compile modern JS into old JS
function js() {
  return (
    gulp
      .src([routes.js.src, "!js/lib"])
      // .pipe(
      //   bro({
      //     transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
      //   })
      // )
      .pipe(gulp.dest(routes.js.dest))
      .pipe(browserSync.stream())
  );
}

// deploy github pages
function gh() {
  return gulp.src("build/**/*").pipe(ghPages());
}

// live watching
function watch() {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
  });
  gulp.watch(routes.scss.watch, style);
  gulp.watch(routes.pug.watch, html).on("change", browserSync.reload);
  gulp.watch(routes.js.watch, js).on("change", browserSync.reload);
}

const prepare = series([clean, img, css]);
const assets = series([html, style, js]);
const live = parallel([watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh]);
