const _ = require("lodash");

module.exports = () => {
    // De-caching for Data files
    const requireUncached = function ($module) {
        delete require.cache[require.resolve($module)];
        return require($module);
    };

    const manageEnvironment = (env) => {
        let globalData = requireUncached(`../../${app.template}/src/data-json/data.json`);

        env.addFilter("concatWithObject", (targetObject, sourseObject) => {
            if (!targetObject || !sourseObject) return;
            if (typeof sourseObject !== "object") return;

            const newObject = _.merge({}, targetObject, sourseObject);
            return newObject;
        });

        env.addFilter("generateModifs", (modifsArray, elemClass) => {
            let clasesString = elemClass;
            if (!modifsArray) return clasesString;

            for (const modificator of modifsArray) {
                if (modificator === "") continue;
                clasesString += ` ${elemClass}--${modificator}`;
            }

            return clasesString;
        });

        env.addFilter("log", (variable) => {
            console.log(variable);
            return null;
        });

        env.addFilter("typeof", (variable) => {
            return typeof variable;
        });

        env.addGlobal("globalData", globalData);
    };

    app.gulp.task("nunjucks", () =>
        app.gulp
            .src(`${app.template}/src/pages/**/*.+(html|njk)`)
            .pipe(app.gulpPlugins.plumber())
            .pipe(
                app.gulpPlugins.nunjucksRender({
                    path: `${app.template}/src/components/`,
                    envOptions: {
                        noCache: false,
                        lstripBlocks: true,
                        trimBlocks: true,
                    },
                    manageEnv: manageEnvironment,
                }),
            )
            .pipe(app.gulpPlugins.formatHtml(global.app.configHTML))
            .pipe(app.gulp.dest(`${app.template}/dist/`))
            .on("end", app.browserSync.reload),
    );
};
