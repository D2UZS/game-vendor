const path = require("path");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const { webpackConfigProd } = require("./webpack.config");

module.exports = () => {
    /* ******************
     *********************
     ********************* */
    app.gulp.task("jsHead", () =>
        app.gulp
            .src(`${app.template}/src/js/to-head/to-head.js`)
            .pipe(app.gulpPlugins.plumber())
            .pipe(
                gulpWebpack(
                    Object.assign(webpackConfigProd, {
                        output: {
                            filename: "to-head.bundle.js",
                            chunkFilename: "to-head.[contenthash:7].bundle.js",
                        },
                    }),
                    webpack,
                ),
            )
            .pipe(app.gulp.dest(`${app.template}/dist/js/to-head`))
            .on("end", app.browserSync.reload),
    );
};
