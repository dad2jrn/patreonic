# Decision Log

Record meaningful project decisions here.

## Decisions

### YYYY-MM-DD - Initial project setup

Decision:
- This project uses Ron's AI-assisted development workflow.

Reason:
- Project context should live in files, not only in chat.

Consequences:
- Cline should read project docs before making meaningful changes.
- Important decisions should be recorded here.

### 2026-05-27 - Astro-first v1 app shell

Decision:
- Patreonic v1 uses an Astro-first single-page app shell with TypeScript, React islands, Tailwind CSS, Motion for React, and GSAP.
- Astro should use Astro 6 if stable and available; otherwise the latest stable Astro release is acceptable and should be captured in the lockfile during install.
- Next.js is out of scope for v1 and should not be added to project dependencies.

Reason:
- The PRD calls for a static-friendly, high-performance creator-economy landing template with limited hydration and isolated interactive islands.
- Astro is better aligned with the v1 static landing-page scope than a full Next.js application.

Consequences:
- Developer commands should center on Astro: `npm run dev`, `npm run build`, and `npm run typecheck`.
- Tests should verify public scaffold behavior and dependency boundaries rather than internal implementation details.
- Any future Next.js variant should be considered a separate direction, not part of this v1 scaffold.

### 2026-05-27 - Story 002 page foundation registry and tokens

Decision:
- Patreonic section structure is driven by a small public registry in `src/content/sections.ts` with stable anchor IDs, navigation labels, and background theme metadata.
- The page shell renders placeholder sections from the registry in `src/pages/index.astro`.
- The initial visual direction uses an original dark ink, ember, plum, moss, copper, teal, and sunrise token palette with display/body font tokens in `src/styles/global.css`.
- Reduced-motion behavior is represented globally with a `prefers-reduced-motion: reduce` rule that disables smooth scrolling and minimizes animations/transitions.

Reason:
- Story 002 requires the design foundation and single-page shell to exist before static content, generated media, header navigation, and motion systems build on it.
- A registry gives future sections, navigation, and scroll-linked atmosphere work one stable source of section metadata.

Consequences:
- Later content and navigation slices should reuse `landingSections` instead of redefining section IDs.
- Later motion work should preserve and extend the reduced-motion contract rather than bypassing it.
- Design refinements should keep Patreonic visually distinguishable and avoid Patreon-owned colors, content, and layout details.
