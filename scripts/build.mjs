import { spawnSync } from "node:child_process";

const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
const command = isVercel
  ? ["node_modules/next/dist/bin/next", "build"]
  : ["scripts/run-framework.mjs", "build"];

console.log(isVercel ? "Building native Next.js output for Vercel..." : "Building Vinext Worker output for Sites...");

const result = spawnSync(process.execPath, command, {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
