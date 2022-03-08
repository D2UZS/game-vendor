const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

module.exports = () => {
    app.gulp.task("images", () =>
        app.gulp
            .src(`${app.template}/src/images/**/*.+(jpg|png|jpeg|gif|svg|webp)`)
            .pipe(
                imagemin([
                    imagemin.gifsicle({
                        interlaced: true,
                    }),
                    imagemin.mozjpeg({
                        progressive: true,
                    }),
                    imagemin.optipng({
                        optimizationLevel: 5,
                    }),
                    imagemin.svgo({
                        plugins: [
                            {
                                removeViewBox: true,
                            },
                            {
                                cleanupIDs: false,
                            },
                        ],
                    }),
                ]),
            )
            .pipe(app.gulp.dest(`${app.template}/dist/images/`))
            .pipe(webp())
            .pipe(app.gulp.dest(`${app.template}/dist/images/`))
            .on("end", app.browserSync.reload),
    );
};
