/* eslint-disable import/extensions -- imported by node native */
import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";
import { getVariables, moduleReturnVariables } from "./index.js";

describe("getVariables", () => {
    it("Simple test with singular variable", () => {
        const source = ":root { --main-color: blue }";
        assert.deepStrictEqual(getVariables(source), {
            "--main-color": "blue",
        });
    });

    it("Simple test with multiple variables", () => {
        const source = ":root { --main-color: blue; --secondary-color: green }";
        assert.deepStrictEqual(getVariables(source), {
            "--main-color": "blue",
            "--secondary-color": "green",
        });
    });

    it("Simple test with multiple selectors", () => {
        const source =
            ":root { --main-color: blue; }\n:root {--secondary-color: green }";
        assert.deepStrictEqual(getVariables(source), {
            "--main-color": "blue",
            "--secondary-color": "green",
        });
    });

    it("File with variables and styling", () => {
        const cssFile = fs.readFileSync("./fixtures/dummy.css", "utf8");
        assert.deepStrictEqual(getVariables(cssFile), {
            "--body-font-size": "14px",
            "--container-border": "rgb(170, 25, 25)",
            "--container-color": "#ccc",
            "--font-family": "Arial, Helvetica, sans-serif",
            "--header-1-size": "calc(var(--body-font-size) * 2)",
            "--header-2-size": "calc(var(--body-font-size) * 1.5)",
            "--header-color": "rgb(68, 68, 163)",
        });
    });
});

describe("moduleReturnVariables", () => {
    const source = ":root { --main-color: blue }";

    it("should return object in cjs format", () => {
        assert.strictEqual(
            moduleReturnVariables(source, "cjs"),
            'const value = {"--main-color":"blue"}\nmodule.exports = value;\n',
        );
    });

    it("should return object in esm format", () => {
        assert.strictEqual(
            moduleReturnVariables(source, "esm"),
            'const value = {"--main-color":"blue"}\nexport default value;\n',
        );
    });

    it("should return object in cjs by default", () => {
        assert.strictEqual(
            moduleReturnVariables(source),
            'const value = {"--main-color":"blue"}\nmodule.exports = value;\n',
        );
    });
});
