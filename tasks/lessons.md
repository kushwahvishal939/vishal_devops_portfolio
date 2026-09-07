# Lessons Learned

## 2026-09-08 — Static export silently drops API routes

- **Mistake**: Contact form worked locally but returned 405 in production. The Next.js
  API route was wired up and tested only against `next dev`.
- **Root Cause**: `next.config.mjs` sets `output: 'export'`. Static export emits no
  server, so route handlers are dropped from the build **without any error** — the build
  log even still lists `ƒ /api/contact`, which is misleading. Cloudflare Pages then
  answered POST from its static asset handler, which allows only GET/HEAD → 405.
- **Rule**: With `output: 'export'`, treat every `app/api/**/route.ts` as dev-only. Any
  endpoint that must exist in production belongs in `functions/` as a Cloudflare Pages
  Function. After any build, verify the endpoint exists in `out/` rather than trusting
  the build summary.

## 2026-09-08 — Verify deploy-time builds locally, not just `next build`

- **Mistake**: Nearly shipped a Pages Function that `next build` accepted but Cloudflare
  would have rejected.
- **Root Cause**: Cloudflare bundles `functions/` with its own esbuild, which reads the
  root `tsconfig.json`. The stale `"target": "es5"` made esbuild fail on destructuring
  and async/await. Next.js never surfaced this because SWC takes its target from
  browserslist, not from tsconfig.
- **Rule**: Different toolchains read the same config differently. Run
  `npx wrangler pages dev <outdir>` locally before pushing anything under `functions/` —
  it exercises the real Workers runtime and the real bundler.

## 2026-09-08 — Prefer signed HTTPS calls over heavy SDKs at the edge

- **Rule**: The AWS SDK is a poor fit for Workers bundles. SES v2 over `fetch` with a
  ~60-line SigV4 signer using Web Crypto is dependency-free and runs identically on Node
  and Workers, which lets dev and production share one implementation instead of two that
  drift.
