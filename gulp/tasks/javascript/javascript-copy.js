const path = require("path");

module.exports = () => {
    app.gulp.task("jsCopy", () =>
        app.gulp
            .src(`${app.template}/src/js/static/*.js`)
            .pipe(app.gulpPlugins.plumber())
            .pipe(app.gulp.dest(`${app.template}/dist/js/static/`))
            .on("end", app.browserSync.reload),
    );
};
