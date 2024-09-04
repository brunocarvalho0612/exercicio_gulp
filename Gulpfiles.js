const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Caminhos dos arquivos
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images'
    }
};

// Tarefa para compilar SASS
function compileSass() {
    return gulp.src(paths.styles.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para comprimir imagens
function compressImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Tarefa para comprimir código JavaScript
function compressJS() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Watch para monitorar mudanças nos arquivos
function watchFiles() {
    gulp.watch(paths.styles.src, compileSass);
    gulp.watch(paths.scripts.src, compressJS);
    gulp.watch(paths.images.src, compressImages);
}

// Exportar as tarefas
exports.sass = compileSass;
exports.images = compressImages;
exports.js = compressJS;
exports.watch = watchFiles;
exports.default = gulp.series(compileSass, compressImages, compressJS, watchFiles);
