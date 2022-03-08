const path = require("path");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const { webpackConfigDefault, webpackConfigProd } = require("./webpack.config");

module.exports = () => {
    app.gulp.task("js", () =>
        app.gulp
            .src(`${app.template}/src/js/index.js`)
            .pipe(app.gulpPlugins.plumber())
            .pipe(
                gulpWebpack(
                    Object.assign(webpackConfigDefault, {
                        output: {
                            filename: "[name].bundle.js",
                            chunkFilename: "[name].[contenthash:7].bundle.js",
                        },
                    }),
                    webpack,
                ),
            )
            .pipe(app.gulp.dest(`${app.template}/dist/js/`))
            .on("end", app.browserSync.reload),
    );

    /* ******************
     *********************
     ********************* */
    app.gulp.task("jsProd", () =>
        app.gulp
            .src(`${app.template}/src/js/index.js`)
            .pipe(app.gulpPlugins.plumber())
            .pipe(
                gulpWebpack(
                    Object.assign(webpackConfigProd, {
                        output: {
                            filename: "[name].bundle.js",
                            chunkFilename: "[name].[contenthash:7].bundle.js",
                        },
                    }),
                    webpack,
                ),
            )
            .pipe(app.gulp.dest(`${app.template}/dist/js/`))
            .on("end", app.browserSync.reload),
    );
};
