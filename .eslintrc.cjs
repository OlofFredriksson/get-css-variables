require("@forsakringskassan/eslint-config/patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["@forsakringskassan"],

    overrides: [
        {
            /* ensure we lint *.cjs and *.mjs files as well */
            files: ["*.cjs", "*.mjs"],
        },
        {
            files: ["./*.{js,ts,cjs,mjs}", "**/bin/*.{js,ts,cjs,mjs}"],
            extends: ["@forsakringskassan/cli"],
        },
        {
            files: "*.spec.[jt]s",
            extends: ["@forsakringskassan/jest"],
        },
    ],
};
