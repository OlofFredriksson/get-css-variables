#!/usr/bin/env node
// Use compiled version, so if file is missing, run build first
const { moduleReturnVariables } = require("../dist/index");
const fs = require("fs");
const args = process.argv.slice(2);

const inputFile = args[0];
const outputFile = args[1];

if (args.length < 2) {
    console.error("Error: Specify both input and output file");
    console.error("Example:  get-css-variables input.css outputFile.js");
    process.exit(1);
}

const input = moduleReturnVariables(fs.readFileSync(inputFile, "utf8"));
fs.writeFileSync(outputFile, input, "utf8");
