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
- What was not done:
- Lessons captured:
