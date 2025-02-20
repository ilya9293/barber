const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const svgSprite = require("gulp-svg-sprite");
const include = require("gulp-include");
const sourcemaps = require("gulp-sourcemaps");

function pages() {
  return src("app/pages/*.html")
    .pipe(
      include({
        includePaths: "app/components",
      })
    )
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("app/fonts/src/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("app/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts"));
}

function images() {
  return (
    src(["app/images/src/*.*", "!app/images/src/*.svg"])
      //  .pipe(newer("app/images"))
      //  .pipe(avif({ quality: 50 }))

      .pipe(src("app/images/src/*.*"))
      .pipe(newer("app/images"))
      .pipe(webp())

      //  .pipe(src("app/images/src/*.*"))
      //  .pipe(newer("app/images"))
      .pipe(imagemin())

      .pipe(dest("app/images"))
  );
}

function sprite() {
  return src("app/icons/src/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("app/icons"));
}

function scripts() {
  return src([
    "node_modules/swiper/swiper-bundle.js",
    "node_modules/accordion-js/dist/accordion.min.js",
    "node_modules/progressbar.js/dist/progressbar.js",
    "node_modules/countup.js/dist/countUp.umd.js",
    "node_modules/scroll-to-element/build/scrollToElement.js",
    "node_modules/axios/dist/axios.js",
    "node_modules/notyf/notyf.umd.js",
    "node_modules/just-validate/dist/just-validate.production.min.js",
    "app/js/*.js",
    "!app/js/main.min.js",
  ])
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/images/src"], images);
  watch(["app/js/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/components/*", "app/pages/*"], pages);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
  return src("docs").pipe(clean());
}

function building() {
  return src(
    [
      "app/css/style.min.css",
      "!app/images/**/*.html",
      "app/images/*.*",
      // "!app/images/*.svg",
      "app/icons/sprite.svg",
      "app/fonts/*.*",
      "app/iconFont/*.*",
      "app/js/main.min.js",
      "app/*.html",
    ],
    { base: "app" }
  ).pipe(dest("docs"));
}

exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, images, scripts, pages, watching);
