import { siteImages } from "../src/data/images.ts";
const collectUrls = value => typeof value === "string" ? [value] : Object.values(value).flatMap(collectUrls);
const urls = [...new Set(collectUrls(siteImages))];
let failed = false;
for (const url of urls) {
  try {
    const start = performance.now();
    const response = await fetch(url, { method: "GET", signal: AbortSignal.timeout(20000) });
    const ok = response.ok && response.headers.get("content-type")?.startsWith("image/");
    const bytes = (await response.arrayBuffer()).byteLength;
    console.log(`${ok ? "PASS" : "FAIL"} ${url}: ${response.status} ${response.headers.get("content-type")}, ${bytes} bytes, ${Math.round(performance.now() - start)} ms`);
    if (!ok) failed = true;
  } catch (error) { console.log(`FAIL ${url}: ${error.message}`); failed = true; }
}
console.log(`Checked ${urls.length} exact configured image URLs.`);
if (failed) process.exitCode = 1;
