module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: "babel-eslint",
    extends: ["airbnb-base", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "prefer-object-spread": "off",
        "no-multi-assign": "off",
        "no-param-reassign": "off",
        "no-underscore-dangle": "off",
        "prefer-destructuring": "off",
        "import/prefer-default-export": "off",
        "no-shadow": "off",
        "no-new": "off",
        "guard-for-in": "off",
        "no-restricted-syntax": "off",
        "import/no-extraneous-dependencies": "off",
        "no-console": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "class-methods-use-this": "off",
        "default-case": "off",
        "no-use-before-define": "off",
        "no-plusplus": "off",
        "consistent-return": process.env.NODE_ENV === "production" ? "error" : "warn",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
        "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "warn",
        "import/no-unresolved": "off",
    },
};
