const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const webp = require('gulp-webp');
const cache = require('gulp-cache');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');

function css(done){
    src('src/scss/**/*.scss')    // Identificar el archivo
        .pipe( plumber() )
        .pipe( sass() )         // Compilarlo
        .pipe( dest('build/css') );     // Almacenarlo en el disco duro
    
    done(); // Callback que avisa a gulp cuando llegamos al final
}

function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{jpg,png}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionAvif(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{jpg,png}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{jpg,png}')
        .pipe( cache( imagemin(opciones) ))
        .pipe( dest('build/img') );
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
        .pipe( dest('build/js') )
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javaScript);

    done();
}

exports.css = css;
exports.js = javaScript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel( versionAvif, imagenes, versionWebp, javaScript, dev);
