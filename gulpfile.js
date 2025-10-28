import { src, dest, watch, parallel } from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import terser from 'gulp-terser'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'

export function styles() {
  const scss = gulpSass(dartSass);
  return src('source/styles/style.scss')
    .pipe((sourcemaps.init()))
    .pipe(scss())
    .pipe(plumber())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/styles'))
}

export function scripts() {
  return src('source/scripts/*.js')
    .pipe((sourcemaps.init()))
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/scripts'))
}

export function images() {
  return src('source/images/**/*', {encoding: false})
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest('build/images/'))
}

export function watchFiles() {
  watch("source/styles/**/*.scss", styles)
  watch("source/scripts/**/*.js", scripts)
}

export default parallel(styles, scripts, watchFiles)