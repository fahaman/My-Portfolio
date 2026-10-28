# Backend & Serverless Architecture

While Mohammed Fahaman's primary portfolio site is statically and SSR-rendered via TanStack Start / Nitro, server handlers are provided for automated endpoints:

- Dynamic XML sitemap generator (`src/routes/sitemap[.]xml.ts`).
- Server error boundary recovery & SSR fallbacks (`src/server.ts`).
- Server-side environment resolution via Nitro Cloudflare preset.
