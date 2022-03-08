module.exports = () => {
    app.gulp.task("clean", () =>
        app.del(
            [
                `${app.template}/dist/**/*`,
                `!${app.template}/dist/no-production`,
                `!${app.template}/dist/favicon`,
                `!${app.template}/dist/local`,
            ],
            {
                force: true,
            },
        ),
    );
};
