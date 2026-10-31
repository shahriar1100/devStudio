import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const required = ['styles.css', 'script.js'];
const missing = required.filter((file) => !existsSync(`dist/${file}`));
const checks = [
  ['page title', /<title>[^<]+<\/title>/.test(html)],
  ['meta description', /name="description"/.test(html)],
  ['main landmark', /<main>/.test(html)],
  ['heading', /<h1>/.test(html)],
  ['external image URLs', /https:\/\/images\.(unsplash|pexels)\.com/.test(html)],
  ['responsive viewport', /name="viewport"/.test(html)]
];

for (const file of missing) console.error(`Missing asset: ${file}`);
for (const [label, passed] of checks) console.log(`${passed ? '✓' : '✗'} ${label}`);
if (missing.length || checks.some(([, passed]) => !passed)) process.exit(1);
