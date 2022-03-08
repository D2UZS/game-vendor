const autoprefixer = require("autoprefixer");
const imageInliner = require("postcss-image-inliner");
const mqPacker = require("css-mqpacker");
const csso = require("postcss-csso");

module.exports = () => {
    const processors = [
        imageInliner(),
        mqPacker({
            sort: sortMediaQueries,
        }),
        autoprefixer(),
        csso({
            restructure: false,
            sourceMap: true,
            debug: false,
            comments: false,
        }),
    ];

    app.gulp.task("scss", () =>
        app.gulp
            .src(`${app.template}/src/styles/style.scss`)
            .pipe(app.gulpPlugins.plumber())
            .pipe(app.gulpPlugins.sourcemaps.init())
            .pipe(app.gulpPlugins.sassGlob())
            .pipe(app.gulpPlugins.sass())
            .pipe(app.gulpPlugins.postcss(processors))
            .pipe(app.gulpPlugins.sourcemaps.write("."))
            .pipe(app.gulp.dest(`${app.template}/dist/css/`))
            .pipe(
                app.browserSync.reload({
                    stream: true,
                }),
            ),
    );
};

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    const A = a.replace(/\D/g, "");

    const B = b.replace(/\D/g, "");

    if (isMax(a) && isMax(b)) {
        return B - A;
    }
    if (isMin(a) && isMin(b)) {
        return A - B;
    }
    if (isMax(a) && isMin(b)) {
        return 1;
    }
    if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
