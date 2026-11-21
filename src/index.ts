import { parse } from "@adobe/css-tools";
import type {
    CssAtRuleAST,
    CssCommentAST,
    CssDeclarationAST,
    CssRuleAST,
} from "@adobe/css-tools";

function isRootRule(rule: CssAtRuleAST): rule is CssRuleAST {
    return rule.type === "rule" && rule.selectors.includes(":root");
}

function isVariableDeclaration(
    decl: CssAtRuleAST | CssCommentAST | CssDeclarationAST,
): decl is CssDeclarationAST {
    return decl.type === "declaration" && decl.property.startsWith("--");
}

function entry(decl: CssDeclarationAST): [key: string, value: string] {
    return [decl.property, decl.value];
}

/**
 * @public
 * @param {string} source - CSS source
 * @returns {Record<string, string>} Js object with variables
 */
export function getVariables(source: string): Record<string, string> {
    const { stylesheet } = parse(source);
    const rules = stylesheet.rules.filter(isRootRule);
    const variables = rules.map((rule) => {
        return rule.declarations.filter(isVariableDeclaration).map(entry);
    });
    return Object.fromEntries(variables.flat());
}

/**
 * @public
 * @param {string} source - CSS source
 * @param {"esm" | "cjs"} [format] - Module output format, default is `"cjs"`.
 * @returns {string} Stringified object surrounded with module.exports
 */
export function moduleReturnVariables(
    source: string,
    format?: "esm" | "cjs",
): string {
    const value = `const value = ${JSON.stringify(getVariables(source))}`;
    if (format === "esm") {
        return `${value}\nexport default value;\n`;
    } else {
        return `${value}\nmodule.exports = value;\n`;
    }
}
