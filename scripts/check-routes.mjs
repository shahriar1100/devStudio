import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
assert.equal(paths.length, 24, "Expected 8 main pages, 6 service pages, and 10 project pages");
assert.equal(new Set(paths).size, 24);
assert.equal(paths.filter(path => path.startsWith("/portfolio/")).length, 10);
const links = new Set();
const titles = new Set();
let contactHtml = "";
for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `${path} must return 200`);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path} needs one h1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]; assert.ok(title, `${path} needs a title`); assert.ok(!titles.has(title), `${path} needs a unique title`); titles.add(title);
  assert.match(html, /rel="canonical"/, `${path} needs a canonical URL`);
  assert.match(html, /property="og:title"/, `${path} needs Open Graph metadata`);
  for (const match of html.matchAll(/href="(\/(?!\/)[^"]*)"/g)) { const href = match[1].replace(/&amp;/g, "&"); if (!href.startsWith("/_next/") && !href.startsWith("/favicon")) links.add(new URL(href, base).pathname); }
  if (path === "/contact") contactHtml = html;
  console.log(`PASS ${path}: HTTP 200, unique title, canonical, Open Graph, one h1`);
}
for (const path of links) if (!paths.includes(path)) assert.equal((await fetch(`${base}${path}`)).status, 200, `Broken internal link: ${path}`);
for (const path of ["/does-not-exist", "/portfolio/unknown-project", "/services/unknown-service"]) assert.equal((await fetch(`${base}${path}`)).status, 404, `Unknown route ${path} must return 404`);
assert.equal((await fetch(`${base}/robots.txt`)).status, 200);
const post = (body, headers = {}) => fetch(`${base}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body });
assert.equal((await post("{}")).status, 400);
assert.equal((await post("{bad json")).status, 400);
assert.equal((await post("{}", { Origin: "https://untrusted.example" })).status, 403);
assert.equal((await post("{}", { "Content-Type": "text/plain" })).status, 415);
assert.equal((await post(JSON.stringify({ description: "x".repeat(21000) }))).status, 413);
if (contactHtml.includes("Online sending is currently unavailable")) {
  const valid = { fullName: "QA Visitor", email: "qa@example.com", phone: "", businessName: "", service: "Business Website", budget: "Not Sure", description: "Automated endpoint validation. No email should be sent.", website: "", startedAt: Date.now() - 10000 };
  assert.equal((await post(JSON.stringify(valid))).status, 503, "Unconfigured delivery must not report success");
  assert.equal((await post(JSON.stringify({ ...valid, website: "spam" }))).status, 400);
  assert.equal((await post(JSON.stringify({ ...valid, startedAt: Date.now() }))).status, 400);
  console.log("PASS contact: disabled delivery returns 503; honeypot and timing checks reject invalid requests");
}
console.log(`PASS ${paths.length} pages, ${links.size} internal paths, 3 unknown routes, robots, and API validation. No email sent.`);
