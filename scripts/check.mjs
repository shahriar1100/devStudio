import { existsSync, readFileSync } from "node:fs";

const required = ["index.html", "styles.css", "script.js", "assets/js/projects.js", "assets/images/contact/contact-illustration.svg"];
const missing = required.filter(file => !existsSync(file));
if (missing.length) throw new Error(`Missing required files: ${missing.join(", ")}`);

const projectSource = readFileSync("assets/js/projects.js", "utf8");
const imagePaths = [...projectSource.matchAll(/image:\s*"([^"]+)"/g)].map(match => match[1]);
const missingImages = imagePaths.filter(file => !existsSync(file));
if (missingImages.length) throw new Error(`Missing project images: ${missingImages.join(", ")}`);

console.log(`Checked ${required.length} required files and ${imagePaths.length} project images.`);
