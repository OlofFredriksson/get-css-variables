const css = require("@adobe/css-tools");

/**
 * @param {*} String CSS source
 * @returns Js obect with variables
 */
export function getVariables(source) {
    const result = {};
    css.parse(source)
        .stylesheet.rules.filter(
            (rule) =>
                rule.selectors && rule.selectors.some((sel) => sel === ":root")
        )
        .forEach((rule) =>
            rule.declarations
                .filter(
                    (decl) =>
                        decl.type === "declaration" &&
                        decl.property.indexOf("--") === 0
                )
                .forEach((decl) => (result[decl.property] = decl.value))
        );
    return result;
}

/**
 *
 * @param {*} String CSS source
 * @returns Stringified object surounded with module.exports
 */
export function moduleReturnVariables(source) {
    return `module.exports = ${JSON.stringify(getVariables(source))}`;
}
