const TerserPlugin = require("terser-webpack-plugin");
const { DuplicatesPlugin } = require("inspectpack/plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const webpackConfigDefault = {
    devtool: "source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-transform-runtime",
                                "es6-promise",
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-export-default-from",
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new ESLintPlugin()],
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
};

const webpackConfigProd = Object.assign({}, webpackConfigDefault, {
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-transform-runtime",
                                "es6-promise",
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-export-default-from",
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // Проверяет, есть ли в бандле одинаковые пакеты разных версий
        new DuplicatesPlugin(),

        // Определяет циклические зависимости
        new CircularDependencyPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
            }),
        ],
    },
    performance: {
        hints: "error",
        maxEntrypointSize: 1e7,
        maxAssetSize: 1e6,
    },
});

module.exports = { webpackConfigDefault, webpackConfigProd };
