import { siteImages } from "../src/data/images.ts";
for (const [name, current] of Object.entries({ hero: siteImages.hero, mobile: siteImages.mobile, dashboard: siteImages.dashboard })) {
  const old = new URL(current);
  old.search = "?auto=format&fit=crop&w=1600&q=85";
  for (const [variant, url] of [["before", old.href], ["after", current]]) {
    const start = performance.now();
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`${name} ${variant}: HTTP ${response.status}`);
    const bytes = (await response.arrayBuffer()).byteLength;
    console.log(JSON.stringify({ name, variant, bytes, type: response.headers.get("content-type"), ms: Math.round(performance.now() - start) }));
  }
}
