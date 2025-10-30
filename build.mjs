import fs from "node:fs/promises";
import { build, analyzeMetafile } from "esbuild";

const extension = {
    cjs: ".cjs",
    esm: ".mjs",
};

await fs.rm("dist", { recursive: true, force: true });

for (const format of ["cjs", "esm"]) {
    const result = await build({
        entryPoints: ["src/index.js"],
        outdir: `dist/${format}`,
        bundle: true,
        format,
        platform: "node",
        target: "node20",
        logLevel: "info",
        metafile: true,
        outExtension: {
            ".js": extension[format],
        },
    });
    console.log(await analyzeMetafile(result.metafile));
}
