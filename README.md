# Dev Studio — We Build Your Ideas

A complete, responsive digital agency website built in this workspace root with Next.js App Router, React, and TypeScript. The design pairs Space Grotesk headings, Inter body text, navy surfaces, blue accents, spacious editorial layouts, and purposeful animation. Light, dark, and system themes are supported.

The site includes every requested page, six services, **exactly ten initial concept projects**, portfolio filters, responsive image frames, an accessible FAQ, custom-quote packages, a reusable testimonial component, and a server-validated inquiry endpoint. No images were generated. All photographs are existing online stock images, clearly identified as temporary placeholders.

## Get started

Use Node.js 22 or newer. Development was performed with Node.js 24.14.1 and npm 11.11.0.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

In Windows PowerShell, use the following when execution policy blocks `npm.ps1`:

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

Open **http://127.0.0.1:3000**. The server binds to loopback by default. No real contact details or credentials are required to explore the website. Without email configuration, the form visibly explains that sending is unavailable and the endpoint never reports a false success.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Validate TypeScript |
| `npm run lint` | Run Next.js and React ESLint rules |
| `npm test` | Run contact validation and rate-limiting tests |
| `npm run build` | Create the production build |
| `npm run start` | Serve that production build locally |
| `npm run check:routes` | Check the running server’s pages, metadata, internal links, 404s, and contact validation |
| `node scripts/check-images.mjs` | Verify the centralized remote image URLs |

`check:routes` defaults to `http://127.0.0.1:3000`. Set `TEST_BASE_URL` to check a different local test server. It does not send real emails: the valid-payload check runs only when the rendered contact page explicitly reports unavailable delivery. It currently asserts the requested initial inventory of 24 public pages and ten portfolio concepts; update the counts if the site grows.

### Fast local preview

Development mode includes compilation and debugging overhead. To check the actual production experience while development continues on port 3000:

```powershell
npm.cmd run build
npm.cmd run start -- --port 3001
```

Open `http://127.0.0.1:3001`. Stop and rebuild this preview after source changes. See [PERFORMANCE.md](PERFORMANCE.md) for measured before/after results, WebP image delivery, shorter hero motion, and deferred timeline code. Browser scrolling and interaction performance have not been independently profiled.

## Pages

| Route | Content |
| --- | --- |
| `/` | Complete agency homepage, including all requested sections |
| `/about` | Mission, vision, values, process, technologies, and benefits |
| `/services` | Six services, benefits, process, and FAQ |
| `/services/[slug]` | Six statically generated service detail pages |
| `/portfolio` | All ten concepts with six interactive category filters |
| `/portfolio/[slug]` | Ten statically generated project detail pages |
| `/pricing` | Three custom-quote packages, scope explanation, and FAQ |
| `/contact` | Validated project inquiry form and configured contact channels |
| `/privacy-policy` | Information handling for this implementation |
| `/terms` | Website-use and project-inquiry terms |
| `/api/contact` | POST endpoint with validation, rate limiting, and optional email delivery |
| `/sitemap.xml` | All 24 public content routes |
| `/robots.txt` | Crawling configuration |

Unknown pages and unknown service/project slugs return a custom 404. Shared loading and recoverable error states are included.

The portfolio concepts are Modina Fashion, Gadget Pro, Nexa Digital, ShopNest, Analytix, Urban Living, Foodie Hub, Estate Prime, EduFlow, and FitZone. None is represented as a verified client engagement or functioning live demo.

## Technology

- Next.js 16 / React 19, App Router, server-rendered and statically generated pages
- TypeScript with strict checking
- Tailwind CSS 4 plus shared CSS variables and responsive component styles
- `next/font` for self-hosted Inter and Space Grotesk
- Motion for React for reveals, filter layout transitions, and FAQ expansion
- GSAP / ScrollTrigger, loaded when the process timeline approaches the viewport
- Lucide React icons
- `next-themes` with persistent light/dark/system selection
- React Hook Form and Zod for shared client/server validation
- Resend HTTP API, only when configured; no additional email SDK needed
- Optional Upstash Redis REST for shared atomic rate limits; required to enable production delivery

`package-lock.json` records the exact installed versions. Use `npm ci` for repeatable installation. Next.js follows its [official support policy](https://nextjs.org/support-policy); review dependencies periodically before future deployments.

## Project structure

```text
src/
  app/
    layout.tsx, page.tsx, globals.css
    loading.tsx, not-found.tsx, error.tsx
    about/  services/[slug]/  portfolio/[slug]/
    pricing/  contact/  privacy-policy/  terms/
    api/contact/route.ts
    sitemap.ts, robots.ts
  components/
    animations/  contact/  home/  layout/
    portfolio/  services/  ui/
  config/site.ts
  data/
    images.ts, projects.ts, services.ts, pricing.ts
    faq.ts, technologies.ts, process.ts
  lib/
    metadata.ts, contact-schema.ts, contact-config.ts, rate-limit.ts
  types/content.ts
scripts/
  check-routes.mjs, check-images.mjs
tests/contact.test.ts
.env.example
next.config.ts
```

## Environment configuration

Copy `.env.example` to `.env.local` for local use. Never commit `.env.local` or API keys.

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute public site URL, without a trailing slash. Defaults to `http://localhost:3000`; set your actual domain before production. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional real email address, displayed publicly. Empty values are hidden. |
| `NEXT_PUBLIC_FACEBOOK_URL` | Optional full HTTPS Facebook URL. Empty values are hidden. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional international WhatsApp number including country code. Formatting is normalized to digits. |
| `RESEND_API_KEY` | Private Resend sending key |
| `CONTACT_FROM_EMAIL` | Sender approved for your verified Resend domain |
| `CONTACT_TO_EMAIL` | Your actual inquiry recipient |
| `UPSTASH_REDIS_REST_URL` | Private Redis REST endpoint for shared production rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Private Redis REST access token |

Only variables explicitly prefixed `NEXT_PUBLIC_` are public. Public values are incorporated into the build; redeploy after changing them. Contact credentials are read on the server. The contact page is dynamic so its available/unavailable state matches server configuration.

### Email behavior

1. Configure the three Resend variables using your own verified sender and recipient.
2. In production, also configure both shared rate-limit variables. Production sending deliberately stays unavailable without them.
3. The form enforces required fields, field lengths, supported services/budgets, and email/phone validation. The endpoint validates independently.
4. A honeypot, three-second minimum form age, one-day maximum form age, JSON/body-size checks, and origin checking reject unsuitable requests.
5. The rate limiter allows five valid attempts per ten minutes. Redis uses one atomic operation to increment the count and set its expiry. Redis outages fail closed.
6. On Vercel, the limiter uses the platform’s forwarded client IP header, hashes it, and never stores inquiry content in Redis. Self-hosted deployments share a conservative bucket until trusted proxy handling is adapted. Development uses an in-memory bucket; it is not a distributed production limiter.
7. A success response is shown only after Resend returns an accepted message ID. Acceptance is not a guarantee of delivery to the recipient’s inbox. Provider failures return an error.

This implementation sends inquiry emails only; it does not create a CRM, store inquiries in a database, send auto-replies, or configure a provider account. Email delivery was not exercised with real credentials during implementation.

## Vercel deployment

1. Create your Git repository in this root and push the source, including `package-lock.json`, to your chosen Git provider. Do not include `.env.local`.
2. Import the repository in Vercel and select **Next.js**. Use this directory as the root, with no nested project directory.
3. Select Node.js 24 (or a supported version at least 22), installation command `npm ci`, and build command `npm run build`. Keep the default Next.js output settings; this project requires server functionality and is not a static export.
4. Add the public site URL and any real contact links. Add the private email/rate-limit configuration if you want submissions enabled immediately.
5. Deploy, connect your intended domain, update `NEXT_PUBLIC_SITE_URL` to that canonical origin, and redeploy. The contact endpoint checks the browser origin against that value. Use the actual preview origin for an independently configured preview environment if testing submission there.
6. Review the live pages, replace stock project imagery, review the legal text against your actual operations, and send one intentional test inquiry from the enabled form.

The production build is ready for Vercel. No Vercel project, account, domain, Redis instance, or live deployment was created by this task. No paid service was provisioned.

## Replace images

All photo URLs are centralized in **`src/data/images.ts`**. Replace the relevant value there; do not edit individual cards. Ten portfolio image values are distinct. Images use Next.js Image with reserved space, responsive sizes, loading behavior, and a neutral icon/text fallback if delivery fails.

When using another remote image host, add its specific HTTPS hostname and allowed pathname to `images.remotePatterns` in `next.config.ts`. Do not allow arbitrary hosts. Update each project’s descriptive `imageAlt` in `src/data/projects.ts` when the image changes.

The hero, about, preview, and project components explicitly disclose stock photography. When adding your genuine project screenshots, update those disclosure strings to accurately describe the new material. Verify rights for any replacement assets. No generated SVGs, raster illustrations, fabricated screenshots, or AI assets are included.

## Add or edit content

- **Projects:** add a typed object to `src/data/projects.ts` with a unique slug, title, category, supported filter, description, features, technologies, image, imageAlt, objective, and approach. Add its URL to `images.ts`. Listing, dynamic details, metadata, sitemap, and related-project choices derive from this source. Add a real HTTPS `liveUrl` only when one exists; otherwise the live-demo link stays hidden. Homepage selections currently use the first six entries. Update route-test counts when adding beyond the initial ten.
- **Services:** edit `src/data/services.ts`. New services receive their own detail routes and sitemap entries. Update quote-form service options when appropriate.
- **Pricing:** edit `src/data/pricing.ts`. Current packages intentionally say “Custom quote.”
- **FAQs, process, technologies:** edit their corresponding files under `src/data/`.
- **Brand, contact channels, navigation:** edit `src/config/site.ts` or the documented public environment values.
- **Colors and responsive rules:** edit CSS variables and styles in `src/app/globals.css`.
- **Testimonials:** `TestimonialSection` accepts an optional `{ quote, name, role }`. Supply it only for an authorized, genuine review. Without one, it shows a project invitation, not a fabricated testimonial.

## Accessibility and motion

The implementation includes a skip link, semantic headings, visible focus indicators, labeled controls, validation messages connected to inputs, accessible accordion state, meaningful image descriptions, and a native modal mobile drawer with Escape handling, focus restoration, and body scroll locking. The site initially follows the system theme, then a single sun/moon button switches between light and dark and remembers the choice. There is no theme dropdown.

Typography uses shared `rem` tokens: 16px body and form inputs, 16–18px introductory copy, 15px interface text, and 13–14px supporting labels at the default browser font size. Only compact decorative device-frame text uses 12px. Mobile layouts wrap or stack content instead of reducing reading sizes.

Reduced-motion styles disable CSS animation and smooth scrolling, Motion respects the user preference, and GSAP does not initialize while that preference is active. The technology marquee pauses on hover and keyboard focus. These are implementation provisions, not a claim of an independent WCAG audit.

## Actual verification

Performed during implementation on 26 October 2026:

- `npm install`: successful; all required dependencies installed.
- `npm run typecheck`: passed.
- `npm run lint`: passed with no errors or warnings.
- `npm test`: all seven tests passed, covering validation, spam fields, local rate limits, shared atomic limits, and production failure behavior.
- `npm run build`: passed with Next.js 16.4.3, including all ten project and six service detail pages.
- `npm run check:routes`: all 24 public pages returned HTTP 200 with unique titles, a canonical URL, Open Graph metadata, and exactly one h1. All 24 internal paths passed. Three unknown paths returned 404. Sitemap and robots responded successfully. Invalid JSON, wrong content type, foreign origin, oversized payload, honeypot, form age, and unavailable contact delivery returned the expected errors.
- Image-source check: all 14 unique Unsplash URLs returned HTTP 200 with an image content type.
- Next.js image optimization: the hero image endpoint returned HTTP 200 with an image content type when the local server had network access.

The sandbox initially blocked npm, Google Fonts, and remote image requests. Dependency installation, font download, and image-source checks succeeded after network access was approved.

**Browser QA limitation:** Windows Computer Use stopped because it could not reliably identify Chrome’s current URL. No browser screenshot, manual visual review, responsive viewport inspection, interactive filter/theme/drawer test, browser console review, or automated accessibility audit was completed. Those interactions are implemented, but their browser verification remains a handoff task. No Lighthouse scores or Core Web Vitals results are claimed.

Recommended browser checks before launch: inspect both themes at 320, 375, 430, 768, 1024, 1440, and 1920 pixels; exercise all filters and device controls; verify mobile drawer focus/Escape/scroll lock; expand FAQ items by keyboard; check field errors; test reduced motion; review remote-image fallbacks; inspect the console; and perform a real, authorized email delivery test after provider setup.

## Known limitations

- Portfolio entries are concepts with stock visual placeholders, not deployed client applications. The device controls resize a photo frame, not a live website.
- No fabricated client reviews, business statistics, fixed prices, addresses, contact details, or live-demo destinations are included.
- Inquiry sending depends on your provider configuration. Production sending also needs shared rate limiting.
- Real contact details and the production domain still need to be supplied.
- The privacy and terms pages describe this implementation and need business-specific review before publication; they are not a substitute for a project agreement.
- Remote stock images require network availability. The fallback preserves layout if they fail.
- Fonts are self-hosted after build; an initial build needs Google Fonts access.
- Browser interaction, visual quality, device testing, and real email delivery could not be independently verified in this session, as explained above.
