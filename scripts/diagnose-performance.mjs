import { gzipSync } from "node:zlib";

// Read-only HTTP diagnostics. Does not change application data or clear image caches.
const roots = process.argv.slice(2);
if (!roots.length) roots.push("http://127.0.0.1:3000", "http://127.0.0.1:3001");
const decode = value => value.replaceAll("&amp;", "&");
async function measure(url, headers = {}) {
  const start = performance.now();
  try {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
    const ttfb = performance.now() - start;
    const buffer = Buffer.from(await response.arrayBuffer());
    return { status: response.status, ttfbMs: Math.round(ttfb), totalMs: Math.round(performance.now() - start), bytes: buffer.length, type: response.headers.get("content-type"), cache: response.headers.get("x-nextjs-cache"), buffer };
  } catch (error) { return { error: error.message, totalMs: Math.round(performance.now() - start) }; }
}
const print = (label, result) => { const summary = { ...result }; delete summary.buffer; console.log(JSON.stringify({ label, ...summary })); };
for (const root of roots) {
  let home;
  for (const path of ["/", "/portfolio", "/contact"]) {
    for (let run = 1; run <= 3; run++) {
      const result = await measure(root + path); print(`${root}${path} run ${run}`, result);
      if (path === "/" && result.buffer) home = result.buffer.toString();
    }
  }
  if (!home) continue;
  const scripts = [...new Set([...home.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => decode(match[1])))];
  let raw = 0, gzipped = 0;
  for (const script of scripts) {
    const result = await measure(new URL(script, root));
    if (result.buffer) { raw += result.buffer.length; gzipped += gzipSync(result.buffer).length; }
  }
  console.log(JSON.stringify({ label: `${root} initial script payload`, scriptCount: scripts.length, rawBytes: raw, estimatedGzipBytes: gzipped }));
  const imageTags = [...home.matchAll(/<img\s[^>]+>/g)].map(match => match[0]);
  console.log(JSON.stringify({ label: `${root} image scheduling`, imageCount: imageTags.length, explicitEager: imageTags.filter(tag => tag.includes('loading="eager"')).length, lazy: imageTags.filter(tag => tag.includes('loading="lazy"')).length, imagePreloads: [...home.matchAll(/<link\s[^>]+>/g)].filter(match => match[0].includes('rel="preload"') && match[0].includes('as="image"')).length, heroExplicitLoading: imageTags[0]?.match(/loading="([^"]+)"/)?.[1] || "omitted (browser default is eager)" }));
  for (let index = 0; index < Math.min(imageTags.length, 3); index++) {
    const src = imageTags[index].match(/src="([^"]+)"/)?.[1];
    if (!src) continue;
    const url = new URL(decode(src), root);
    url.searchParams.set("w", index === 0 ? "1080" : "384");
    for (let run = 1; run <= 2; run++) print(`${root} hero image ${index + 1} modern browser run ${run}`, await measure(url, { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" }));
    print(`${root} hero image ${index + 1} WebP`, await measure(url, { Accept: "image/webp,image/*,*/*;q=0.8" }));
  }
}
