module.exports = () => {
    app.gulp.task("fonts", () =>
        app.gulp
            .src(`${app.template}/src/fonts/**/*.+(eot|otf|ttf|woff|woff2|ttc|svg)`)
            .pipe(app.gulp.dest(`${app.template}/dist/fonts/`))
            .on("end", app.browserSync.reload),
    );
};
