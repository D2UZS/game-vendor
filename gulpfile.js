// TODO: Разобраться с global.app. Сделать его единообразным или удалить вообще
const del = require("del");
const gulp = require("gulp");
const gulpPlugins = require("gulp-load-plugins")();
const browserSync = require("browser-sync").create();

const tasks = require("./gulp/config/tasks");
const config = require("./config.json");

const { template } = config;
const productionPath = config.path;

global.app = {
    del,
    gulp,
    gulpPlugins,
};
global.app.configHTML = {
    indent_size: 4,
    indent_char: "\t",
    brace_style: "expand",
    inline: [],
    preserve_newlines: false,
    indent_empty_lines: true,
    eol: "\n",
};
global.app.del = del;
global.app.gulp = gulp;
global.app.gulpPlugins = gulpPlugins;
global.app.browserSync = browserSync;
global.app.mode = process.env.NODE_ENV || "development";
global.app.template = template;
global.app.path = productionPath;

tasks.forEach((taskPath) => {
    require(taskPath)();
});

gulp.task("default", gulp.parallel("watch", "webserver"));

gulp.task("run", gulp.parallel("watch", "webserver", "js", "scss", "nunjucks"));

gulp.task(
    "build",
    gulp.series("clean", gulp.parallel("jsProd", "jsCopy", "scss", "images", "fonts", "nunjucks")),
);
