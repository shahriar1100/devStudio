import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "dist");

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  cpSync(join(root, file), join(output, file));
}

cpSync(join(root, "assets"), join(output, "assets"), { recursive: true });
console.log("Static site built in dist/");
