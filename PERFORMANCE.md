# Performance diagnosis and optimization — 26 October 2026

The initial diagnostic below measured the original site. After the user requested fixes, the following optimizations were implemented. The user's existing development server was left running; a separate production server on port 3001 was used for validation and stopped afterward.

## Implemented fixes

- Request compressed WebP sources from Unsplash rather than a large PNG/JPEG source before local optimization. The hero source is 1400px, the about source 1200px, and small hero previews 384px/480px. Portfolio detail sources retain 1600px.
- Prefer WebP output in Next.js instead of cold-cache AVIF encoding. This trades slightly larger cached browser files for lower first-request processing cost.
- Set the important image to explicit eager loading with high fetch priority; other images remain lazy. Match image `sizes` to the hero's responsive columns, floating frames, and two-/three-column project grids.
- Keep the hero headline and visual visible during a short 350ms transform animation. Remove the delayed opacity reveal from introductory text and CTA buttons; they are visible immediately.
- Load GSAP/ScrollTrigger only when the process timeline approaches within 300px of the viewport. Handle reduced-motion changes, pending imports, unmount cleanup, and optional module-load failure without hiding the timeline.
- Add `data-scroll-behavior="smooth"` so Next.js can handle route-transition scrolling correctly.
- Update image checks to verify the exact centralized URLs, including their configured formats and sizes.

## Results after changes

The following production image requests were cache misses, measured with the same modern-browser Accept header as the initial diagnosis:

| Image / requested output width | Before (AVIF) | After (WebP) |
| --- | --- | --- |
| Main hero / 1080px | 752 ms | 363 ms |
| Mobile preview / 384px | 390 ms | 71 ms |
| Dashboard preview / 384px | 269 ms | 47 ms |

Subsequent cached requests took 3–4ms. These are separate local samples, not a controlled benchmark or a full page-load score. Network and upstream cache conditions can vary. The main browser image output increased from 25,287 bytes (AVIF) to 37,572 bytes (WebP), in exchange for lower first-request cost.

The upstream source downloads used by the Next.js optimizer changed as follows:

| Source download | Before | After |
| --- | --- | --- |
| Hero | 1,710,423 bytes, PNG | 132,754 bytes, WebP |
| Mobile | 956,156 bytes, JPEG | 54,404 bytes, WebP |
| Dashboard | 222,968 bytes, JPEG | 28,026 bytes, WebP |

Source savings are **server-to-image-provider transfer**, not direct browser-payload savings. Runtime-deferred GSAP is not included in the initial script comparison. The initial production script payload remains essentially unchanged: 736,802 → 737,330 uncompressed bytes; no bundle-size reduction is claimed.

Validation after the changes: TypeScript, ESLint, seven unit tests, production build, all 24 routes/internal paths, expected 404/API responses, and all 15 exact image-source URLs passed. Server HTML confirms one eager hero image, ten lazy images, and image preloading. Browser interaction profiling remains unperformed; the viewport-triggered animation change was code-reviewed and build-checked, not verified in a browser trace.

The production build is ready. For a faster local preview alongside development on port 3000:

```powershell
npm.cmd run start -- --port 3001
```

Open `http://127.0.0.1:3001`. After further source edits, run `npm.cmd run build` before restarting production. Development mode still includes compilation, debugging, and larger script payloads; these fixes do not remove that intentional framework overhead.

## Original baseline

## Confirmed observations

The user’s local server at `http://127.0.0.1:3000` is running `npm run dev`. The existing production build was separately served on port 3001 for comparison, then stopped. The development server was left running.

| Measurement | Development | Production |
| --- | --- | --- |
| Homepage HTML, three full HTTP response samples | 363 / 341 / 358 ms | 76 / 9 / 8 ms |
| Portfolio HTML, three samples | 398 / 138 / 146 ms | 27 / 6 / 5 ms |
| Contact HTML, three samples | 152 / 229 / 162 ms | 137 / 17 / 16 ms |
| Initially referenced JavaScript files | 20 | 10 |
| Combined uncompressed script bytes | 4,882,438 | 736,802 |
| Estimated gzip size of those scripts | 1,003,469 | 232,644 |

These are local HTTP measurements, not browser page-load, LCP, interaction, or rendering measurements. Gzip sizes were calculated from downloaded script contents, not measured as actual browser wire transfer. Runtime-loaded chunks, route prefetches, fonts, CSS, and images are additional resources. Initial script size is about 6.6 times larger in development; production is about 85% smaller uncompressed.

The development log also shows initial route compilation. First requests can therefore be slower than the already-compiled measurements above.

## Image delivery adds first-visit cost

The image pipeline fetches external Unsplash photos and optimizes them locally. All source URLs request up to 1600px at quality 85, including the sources for small floating previews. AVIF is preferred over WebP in `next.config.ts`.

For the hero at a requested output width of 1080px:

| Measurement | Development | Production |
| --- | --- | --- |
| Uncached AVIF response | 1,057 ms | 752 ms |
| Subsequent cached AVIF response | 4 ms | 4 ms |
| Uncached WebP response | 523 ms | 324 ms |

The formats were requested sequentially and source/network caches may differ, so these measurements do not isolate encoding CPU time. They do confirm a substantial cold-cache image delay. Next.js documents the AVIF first-request encoding tradeoff and recommends WebP for most use cases: https://nextjs.org/docs/app/api-reference/components/image#formats

The hero itself uses `priority`, which the installed Next.js version maps to preload and non-lazy loading. A development warning flags the same source URL as lazy/LCP, but that URL is also reused in the below-the-fold device preview. The warning alone does **not** prove that the main hero was lazy-loaded.

## Other findings and follow-up opportunities

- The hero’s CSS reveal intentionally takes roughly 1.05 seconds for the visual and 1.1 seconds for the CTA including delay. This can make a ready page feel slower; it is not evidence of CPU jank.
- The process timeline imports GSAP and ScrollTrigger immediately on component mount, even though that section is far below the fold. Deferring this import until the section approaches the viewport could reduce initial work.
- Motion is also included in the shared provider and interactive sections. Its actual contribution to main-thread delay requires browser profiling; it should not be blamed without a trace.
- Development logs show a hydration mismatch for an extra `cz-shortcut-listen` body attribute. That attribute is absent from application source and suggests browser-extension injection. The responsible extension and its performance impact were not verified.
- Next.js reports missing `data-scroll-behavior="smooth"` metadata for the global smooth-scroll setting. This can affect route-transition scroll behavior. Official guidance: https://nextjs.org/docs/messages/missing-data-scroll-behavior

## Recommended order

1. Compare the site using `npm.cmd run build` followed by `npm.cmd run start -- --port 3001`, while keeping development on port 3000 if needed. Assess perceived speed on the production URL.
2. Reduce first-request image work: evaluate WebP-first delivery, appropriately sized source images, and accurate responsive image sizes. Preserve the centralized online-image requirement.
3. Shorten the hero reveal and defer below-the-fold animation code.
4. Profile the browser for LCP, long tasks, scrolling, and layout shift before making broader animation changes. Investigate the extension-injected attribute separately.

No browser performance trace or Lighthouse run was collected. Scroll jank and click latency therefore remain unverified. No optimization improvement is claimed: this pass measured the existing implementation.

Repeat the HTTP diagnostics against running servers:

```powershell
node scripts/diagnose-performance.mjs http://127.0.0.1:3000 http://127.0.0.1:3001
```

Image requests naturally warm the cache. Repeated runs will show cached performance unless an existing size/format variant has not been requested before; the script does not delete caches.
