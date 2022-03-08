module.exports = () => {
    const config = {
        server: {
            baseDir: `${app.template}/dist/`,
        },
        open: "local",
        host: "localhost",
        logPrefix: "mockup",
        reloadOnRestart: true,
    };

    app.gulp.task("webserver", () => {
        app.browserSync.init(config);
    });
};
