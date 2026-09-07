## Task: Terminal Brutalism Redesign

### Design Direction
**Aesthetic**: Terminal Brutalism - raw, confident, DevOps-native
**DFII Score**: 13/15
**Philosophy**: "I live in the terminal, I ship infrastructure, I don't need decoration."

### Design System
- **Fonts**: JetBrains Mono (primary - everything), Space Grotesk (headings only)
- **Background**: #0a0a0a (true black, not navy)
- **Text**: #e0e0e0 (soft white), #666 (muted)
- **Accent**: #f59e0b (amber/terminal gold) - single accent, no neon
- **Secondary**: #22c55e (terminal green) - sparingly for status indicators
- **Cards**: No glass morphism. Bordered boxes with 1px solid #222, no blur, no glow
- **Radius**: 0px or 2px max. No rounded corners.
- **Motion**: Remove particles, custom cursor, floating logos, tilt cards. Keep only page transitions and subtle scroll reveals
- **Grid**: Monospaced data grids, terminal-like readouts, ASCII-inspired dividers

### Differentiation Anchor
> "If screenshotted with the logo removed, you'd think this was a senior engineer's personal terminal dashboard, not a portfolio template."

### Plan

#### Phase 1: Design System Foundation
- [ ] Rewrite tailwind.css - new color tokens, remove neon/glass utilities
- [ ] Update tailwind.config.js - add Space Grotesk font, update color mappings
- [ ] Update layout.tsx - add Space Grotesk font import, remove CustomCursor
- [ ] Remove/gut animation components: FloatingParticles, CustomCursor, TiltCard, AntiGravityCard, MagneticHover, MagneticButton

#### Phase 2: Header & Navigation
- [ ] Redesign Header.tsx - minimal terminal-style nav, no magnetic effects

#### Phase 3: Homepage
- [ ] Redesign HeroSection.tsx - terminal-style hero, no particles/floating logos/3D circles
- [ ] Redesign SkillsPreview.tsx - monospaced skill bars, terminal readout
- [ ] Redesign ExperienceTimeline.tsx (homepage) - clean timeline, no glass
- [ ] Redesign FeaturedProjects.tsx - bordered cards, no hover zoom
- [ ] Redesign ContactCTA.tsx - simple, direct CTA

#### Phase 4: About Page
- [ ] Redesign About HeroSection.tsx
- [ ] Redesign PhilosophySection.tsx
- [ ] Redesign ExpertiseSection.tsx
- [ ] Redesign JourneyTimeline.tsx

#### Phase 5: Skills Page
- [ ] Redesign SkillsInteractive.tsx - terminal-style tabs and skill display

#### Phase 6: Experience Page
- [ ] Redesign ExperienceInteractive.tsx and sub-components

#### Phase 7: Portfolio Page
- [ ] Redesign PortfolioInteractive.tsx and ProjectCard.tsx

#### Phase 8: Contact Page
- [ ] Redesign ContactHero.tsx
- [ ] Redesign ContactForm.tsx
- [ ] Redesign ContactMethods.tsx
- [ ] Redesign FAQSection.tsx

#### Phase 9: Misc Pages
- [ ] Redesign not-found.tsx

### Review
- What was done:
  - `src/lib/contact-mailer.mjs` — zero-dep SES v2 sender (SigV4 via fetch + Web Crypto)
    plus validation, sanitization, email templating and best-effort rate limiting. Runs
    unchanged on Node and the Workers runtime.
  - `functions/api/contact.js` — Cloudflare Pages Function serving POST /api/contact in
    production; returns a real 405 (with `Allow: POST`) for other methods.
  - `src/app/api/contact/route.ts` — reduced to a thin wrapper over the same module so
    `next dev` and production cannot drift.
  - `tsconfig.json` — `target` es5 → ES2020. Cloudflare's esbuild reads this file and
    refused to build the Function under es5; the Pages deploy would have failed too.
  - Removed the unused `@aws-sdk/client-ses` dependency.
  - `.dev.vars` (gitignored) added for `wrangler pages dev`.
- Verification:
  - `tsc --noEmit` clean; `next build` clean.
  - `next dev`: 400s on missing fields / bad email / short message; real SES send → 200.
  - `wrangler pages dev out` (real Workers runtime): GET → 405 `Allow: POST`,
    POST invalid → 400, full SES send → 200. Two test emails delivered.
- What was not done:
  - SES env vars still need to be set in the Cloudflare Pages project settings.
  - Rate limiting is per-isolate only; a distributed limiter would need KV or Durable
    Objects.
- Lessons captured: see lessons.md

---

## Task: Fix contact form 405 on deployed site

### Root Cause
`next.config.mjs` uses `output: 'export'` (static export). Static export drops all API
route handlers, so `src/app/api/contact/route.ts` is never deployed. Cloudflare Pages
serves `/api/contact` from its static asset handler, which allows only GET/HEAD → 405 on
POST. Works locally because `next dev` runs the real Node server.

### Plan
- [x] Extract SES send + validation into a runtime-agnostic module (zero deps, SigV4 over
      fetch + Web Crypto) so Node and the Workers runtime share one implementation
- [x] Add `functions/api/contact.js` Cloudflare Pages Function calling that module
- [x] Rewrite `src/app/api/contact/route.ts` as a thin wrapper over the same module
      (keeps `next dev` working)
- [x] Drop the now-unused `@aws-sdk/client-ses` dependency
- [x] Verify: build, local dev POST, deployed POST

### Review
- What was done:
  - `src/lib/contact-mailer.mjs` — zero-dep SES v2 sender (SigV4 via fetch + Web Crypto)
    plus validation, sanitization, email templating and best-effort rate limiting. Runs
    unchanged on Node and the Workers runtime.
  - `functions/api/contact.js` — Cloudflare Pages Function serving POST /api/contact in
    production; returns a real 405 (with `Allow: POST`) for other methods.
  - `src/app/api/contact/route.ts` — reduced to a thin wrapper over the same module so
    `next dev` and production cannot drift.
  - `tsconfig.json` — `target` es5 → ES2020. Cloudflare's esbuild reads this file and
    refused to build the Function under es5; the Pages deploy would have failed too.
  - Removed the unused `@aws-sdk/client-ses` dependency.
  - `.dev.vars` (gitignored) added for `wrangler pages dev`.
- Verification:
  - `tsc --noEmit` clean; `next build` clean.
  - `next dev`: 400s on missing fields / bad email / short message; real SES send → 200.
  - `wrangler pages dev out` (real Workers runtime): GET → 405 `Allow: POST`,
    POST invalid → 400, full SES send → 200. Two test emails delivered.
- What was not done:
  - SES env vars still need to be set in the Cloudflare Pages project settings.
  - Rate limiting is per-isolate only; a distributed limiter would need KV or Durable
    Objects.
- Lessons captured: see lessons.md
