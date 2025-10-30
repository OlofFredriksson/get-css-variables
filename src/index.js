const css = require("@adobe/css-tools");

/**
 * @param {import("@adobe/css-tools").CssAtRuleAST} rule
 * @returns {rule is import("@adobe/css-tools").CssRuleAST}
 */
function isRootRule(rule) {
    return rule.type === "rule" && rule.selectors.includes(":root");
}

/**
 * @param {import("@adobe/css-tools").CssCommentAST | import("@adobe/css-tools").CssDeclarationAST} decl
 * @returns {decl is import("@adobe/css-tools").CssDeclarationAST}
 */
function isVariableDeclaration(decl) {
    return decl.type === "declaration" && decl.property.startsWith("--");
}

/**
 * @param {import("@adobe/css-tools").CssDeclarationAST} decl
 * @returns {[key: string, value: string]}
 */
function entry(decl) {
    return [decl.property, decl.value];
}

/**
 * @public
 * @param {string} source - CSS source
 * @returns {Record<string, string>} Js object with variables
 */
export function getVariables(source) {
    const { stylesheet } = css.parse(source);
    const rules = stylesheet.rules.filter(isRootRule);
    const variables = rules.map((rule) => {
        return rule.declarations.filter(isVariableDeclaration).map(entry);
    });
    return Object.fromEntries(variables.flat());
}

/**
 * @public
 * @param {string} source - CSS source
 * @returns {string} Stringified object surounded with module.exports
 */
export function moduleReturnVariables(source) {
    return `module.exports = ${JSON.stringify(getVariables(source))}`;
}
