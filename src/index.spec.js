import fs from "fs";
import { getVariables, moduleReturnVariables } from "./index";

describe("getVariables", () => {
    it("Simple test with singular variable", () => {
        expect(getVariables(":root { --main-color: blue }")).toMatchObject({
            "--main-color": "blue",
        });
    });

    it("Simple test with multiple variables", () => {
        expect(
            getVariables(
                ":root { --main-color: blue; --secondary-color: green }"
            )
        ).toMatchObject({
            "--main-color": "blue",
            "--secondary-color": "green",
        });
    });

    it("File with variables and styling", () => {
        const cssFile = fs.readFileSync("./fixtures/dummy.css", "utf8");
        expect(getVariables(cssFile)).toMatchInlineSnapshot(`
            {
              "--body-font-size": "14px",
              "--container-border": "rgb(170, 25, 25)",
              "--container-color": "#ccc",
              "--font-family": "Arial, Helvetica, sans-serif",
              "--header-1-size": "calc(var(--body-font-size) * 2)",
              "--header-2-size": "calc(var(--body-font-size) * 1.5)",
              "--header-color": "rgb(68, 68, 163)",
            }
        `);
    });
});

describe("moduleReturnVariables", () => {
    it("should return object in exported module", () => {
        expect(moduleReturnVariables(":root { --main-color: blue }")).toBe(
            'module.exports = {"--main-color":"blue"}'
        );
    });
});
