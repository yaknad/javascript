var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html']
};

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

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

gulp.task('default', gulp.series('copy-html', function () {
    return browserify({
        basedir: '.',
        debug: true,        //enables source maps
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify) // .plugin(tsify, { noImplicitAny: true }) - Is there a way to add options from the tsconfig.json file?
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}));

//gulp.task('default', [ 'copy-html', 'browserify' ]);

// var gulp = require("gulp");
// var ts = require("gulp-typescript");
// var tsProject = ts.createProject("tsconfig.json");

// gulp.task("default", function () {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest("dist"));
// });