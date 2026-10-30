import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mimeTypes = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  let filePath = normalize(join(root, relativePath));
  if (!existsSync(filePath) && !extname(filePath) && existsSync(`${filePath}.html`)) filePath = `${filePath}.html`;
  if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": `${mimeTypes[extname(filePath)] || "application/octet-stream"}; charset=utf-8` });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
