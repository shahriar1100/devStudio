# Creative portfolio

A responsive, single-page portfolio inspired by the supplied indigo portfolio reference.

## Run locally

```bash
npm run dev
```

Then open `http://127.0.0.1:4173`.

## Build for Vercel

```bash
npm run build
```

Vercel is configured as an `Other` framework and deploys the generated `dist` directory.

## Change project images

See `assets/README.md`. Project content and image paths live in `assets/js/projects.js`; the carousel is rendered automatically from that list.

## Admin dashboard

The production dashboard is available at `/dashboard`. It can edit the My Work heading, small text, projects, images, ordering and external links.

The dashboard uses Vercel Functions and a public Vercel Blob store:

1. In the Vercel project, open **Storage** and create a **Blob** store with **Public** access. Connect it to Production; Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
2. In **Settings → Environment Variables**, add `ADMIN_PASSWORD` with a strong private password for Production, Preview and Development.
3. Redeploy the latest commit so the new environment variables apply.

Never add either secret to Git. `.env.example` contains names only.
