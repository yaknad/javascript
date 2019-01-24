var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var uglify = require('gulp-uglify');
var tsify = require("tsify");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var paths = {
    pages: ['src/*.html']
};

//!!! NOTE: when using "tsify" / "gulp-typescript" instead of compiling with ts.exe, you will not see the compile error logs!!!

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,  // !!! adds source maps (to the original node/typescript code) inside the bundle.js file, but when using uglify, we need another plugin for sourcemaps - see later!!!
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function babelifyAndBundle() {
    return watchedBrowserify
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
         })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())  // !!! see: https://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
};

gulp.task('default', gulp.series('copy-html', babelifyAndBundle));

watchedBrowserify.on("update", babelifyAndBundle);
watchedBrowserify.on("log", gutil.log);


// !!! SEE ALSO:
// https://teamtreehouse.com/community/can-i-make-sourcemaps-work-after-concatenation-minification

// WITHOUT WATCHIFY:
// gulp.task('default', gulp.series('copy-html', function () {
//     return browserify({
//         basedir: '.',
//         debug: true,        //enables source maps
//         entries: ['src/main.ts'],
//         cache: {},
//         packageCache: {}
//     })
//     .plugin(tsify) // .plugin(tsify, { noImplicitAny: true }) - Is there a way to add options from the tsconfig.json file?
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('dist'));
// }));

// WRONG DEPENDENCIES SYNTAX (in GULP 4.0)
// gulp.task('default', ['copy-html'], function () {
//     return browserify({
//         basedir: '.',
//         debug: true,        //enables source maps
//         entries: ['src/main.ts'],
//         cache: {},
//         packageCache: {}
//     })
//     .plugin(tsify) // .plugin(tsify, { noImplicitAny: true }) - Is there a way to add options from the tsconfig.json file?
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('dist'));
// });


// WRONG DEPENDENCIES SYNTAX (in GULP 4.0)
//gulp.task('default', [ 'copy-html', 'browserify' ]);

// var gulp = require("gulp");
// var ts = require("gulp-typescript");
// var tsProject = ts.createProject("tsconfig.json");

// gulp.task("default", function () {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest("dist"));
// });