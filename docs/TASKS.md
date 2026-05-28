# Tasks

## Active

Parent PRD: `docs/PRD.md`

### Patreonic Astro Landing Template Issues

#### 001 — Scaffold Astro-first Patreonic app shell

- Type: AFK
- Status: Completed
- Blocked by: None - can start immediately
- User stories covered: 5, 6, 7, 8, 47, 48

What to build:
- Create a runnable Astro-first project foundation for Patreonic with TypeScript, React integration, Tailwind CSS, Motion for React, GSAP, local development scripts, and a documented Astro version decision.

Acceptance criteria:
- [x] The app can install dependencies locally and run a development server.
- [x] Astro is configured as the primary framework, with Astro 6 used if stable/available or latest stable Astro documented otherwise.
- [x] React, TypeScript, Tailwind CSS, Motion for React, and GSAP are installed/configured for project use.
- [x] Next.js is not included in v1 dependencies or implementation.
- [x] Basic build/typecheck scripts exist and are documented.

Notes:
- Implemented with TDD scaffold contract tests in `tests/scaffold-contract.test.mjs`.
- Verification command: `npm run verify`.
- Astro version decision recorded in `docs/DECISIONS.md`.

#### 002 — Build design tokens, page shell, and section registry

- Type: AFK
- Status: Completed
- Blocked by: None - 001 completed
- User stories covered: 4, 8, 41, 44, 49, 50

What to build:
- Define the Patreonic design foundation and single-page shell, including distinguishable palette/type direction, layout primitives, section metadata, anchor IDs, background theme definitions, and reduced-motion configuration.

Acceptance criteria:
- [x] A base layout renders a single-page Patreonic shell.
- [x] Section registry defines IDs, navigation labels, and background theme metadata.
- [x] Design tokens establish a distinguishable palette and typography direction that does not copy Patreon.
- [x] Reduced-motion preferences are represented in a reusable configuration or utility.
- [x] The page shell can render placeholder sections from the registry.

Notes:
- Implemented with TDD page foundation tests in `tests/story-002-page-foundation.test.mjs`.
- Section metadata lives in `src/content/sections.ts` and renders through `src/pages/index.astro`.
- Design tokens and reduced-motion defaults live in `src/styles/global.css`.
- Verification command: `npm run verify`.

#### 003 — Create static landing-page content skeleton

- Type: AFK
- Status: Completed
- Blocked by: 002 — Build design tokens, page shell, and section registry
- User stories covered: 1, 2, 3, 11, 12, 13, 30, 31, 32, 33, 34, 35, 36, 37

What to build:
- Render all v1 landing sections with original Patreonic copy and clear CTA structure before adding complex animation.

Acceptance criteria:
- [x] Hero section renders original headline, supporting copy, and primary/secondary CTAs.
- [x] Creator Types / Use Cases, How It Works, Feature Showcase, Membership / Tier Preview, Community / Social Proof, Testimonials, FAQ, and Final CTA / Footer sections render.
- [x] All copy is original and does not reuse Patreon site content.
- [x] Sections are reachable through anchor IDs defined in the section registry.
- [x] The static page is responsive enough to validate content hierarchy on desktop and mobile.

Notes:
- Implemented with TDD content skeleton tests in `tests/story-003-content-skeleton.test.mjs`.
- Original section copy and CTA structure render through `src/pages/index.astro` using the Story 002 registry anchors.
- Responsive content hierarchy classes live in `src/styles/global.css`.
- Verification command: `npm run verify`.

#### 004 — Build generated media card system and visual collage primitives

- Type: AFK
- Status: Completed
- Blocked by: 002 — Build design tokens, page shell, and section registry
- User stories covered: 38, 39, 40, 42, 49, 50

What to build:
- Create reusable CSS/HTML-generated abstract creator/media cards and visual primitives for posts, creators, videos, tiers, stats, avatars, and community/media tiles.

Acceptance criteria:
- [x] Media card variants exist for creator/avatar, post, video/media, tier, stat, and community concepts.
- [x] Cards use generated CSS/HTML visuals rather than external image services.
- [x] Visual style is original and distinguishable from Patreon assets.
- [x] Cards can be composed in the hero and supporting page sections.
- [x] Rendering tests or equivalent checks cover expected card variants.

Notes:
- Implemented with TDD generated media card tests in `tests/story-004-generated-media-cards.test.mjs`.
- Reusable generated media metadata lives in `src/content/media-cards.ts` and is composed into the hero collage in `src/pages/index.astro`.
- CSS-only visual primitives and variant treatments live in `src/styles/global.css`.
- Verification command: `npm run verify`.

#### 005 — Implement adaptive sticky header navigation

- Type: AFK
- Status: Completed
- Blocked by:
  - 002 — Build design tokens, page shell, and section registry
  - 003 — Create static landing-page content skeleton
- User stories covered: 19, 20, 21, 22, 23, 24, 25, 26

What to build:
- Implement the sticky adaptive header with scroll-state styling, active section indication, animated desktop dropdowns, keyboard-accessible focus behavior, and animated mobile full-screen menu.

Acceptance criteria:
- [x] Header starts airy/transparent over the hero and changes visual treatment after scroll.
- [x] Active section state updates as the user scrolls through registered sections.
- [x] Desktop navigation dropdowns or mega-menu panels open on hover and focus.
- [x] Mobile navigation opens/closes as an animated full-screen menu.
- [x] Keyboard users can operate nav dropdowns and mobile menu with visible focus states.

Notes:
- Implemented with TDD adaptive header tests in `tests/story-005-adaptive-header.test.mjs`.
- Header markup and lightweight browser behavior live in `src/pages/index.astro`, reusing the Story 002 section registry.
- Header, dropdown, active link, focus, and mobile menu styles live in `src/styles/global.css`.
- Verification command: `npm run verify`.

#### 006 — Implement hero visual composition and pointer motion system

- Type: AFK
- Status: Completed
- Blocked by:
  - 003 — Create static landing-page content skeleton
  - 004 — Build generated media card system and visual collage primitives
- User stories covered: 11, 12, 13, 14, 15, 16, 17, 18, 43, 44, 45

What to build:
- Create a Patreon-inspired but original hero composition with layered generated media visuals and GSAP-powered pointer parallax/tilt/depth behavior, including reset-on-leave, touch fallback, and reduced-motion fallback.

Acceptance criteria:
- [x] Hero visual field uses original generated media/card elements.
- [x] Pointer movement creates smooth layered parallax and/or tilt behavior.
- [x] Foreground elements move more noticeably than background elements.
- [x] Elements ease back to their resting positions when the pointer leaves the hero.
- [x] Touch devices receive simplified ambient or static behavior.
- [x] Reduced-motion preference disables or significantly reduces hero motion.

Notes:
- Implemented with TDD hero motion tests in `tests/story-006-hero-motion.test.mjs`.
- Hero depth and resting-position metadata lives in `src/content/media-cards.ts` and renders through the hero collage in `src/pages/index.astro`.
- GSAP pointer parallax/tilt, reset-on-leave, touch fallback, and reduced-motion fallback are implemented with CSS custom properties and styles in `src/styles/global.css`.
- Verification command: `npm run verify`.

#### 007 — Implement scroll-linked atmosphere/background system

- Type: AFK
- Status: Ready after 002 and 003
- Blocked by:
  - 002 — Build design tokens, page shell, and section registry
  - 003 — Create static landing-page content skeleton
- User stories covered: 27, 28, 29, 41, 43, 44, 45

What to build:
- Implement section-driven background theme transitions and atmospheric layers that shift smoothly as the user scrolls through the landing page.

Acceptance criteria:
- [ ] Major sections declare background themes through the section registry or equivalent metadata.
- [ ] Page background transitions smoothly between section themes during scroll.
- [ ] Atmospheric gradient/blob/noise layers are original and performant.
- [ ] Reduced-motion preference simplifies or disables scroll-linked motion.
- [ ] Scroll behavior avoids layout thrashing and favors transform/opacity updates.

#### 008 — Add section-level interaction polish

- Type: AFK
- Status: Ready after 003, 004, and 007
- Blocked by:
  - 003 — Create static landing-page content skeleton
  - 004 — Build generated media card system and visual collage primitives
  - 007 — Implement scroll-linked atmosphere/background system
- User stories covered: 9, 10, 30, 31, 32, 33, 34, 35, 36, 37, 43

What to build:
- Add Motion-enhanced interactions to supporting sections, including feature cards, use-case cards, testimonials, FAQ panels, tier preview, and final CTA.

Acceptance criteria:
- [ ] Interactive cards have polished hover/focus/tap transitions where appropriate.
- [ ] FAQ panels can open and close accessibly.
- [ ] Testimonials, tiers, and CTA areas include tasteful motion without obscuring content.
- [ ] Reduced-motion preference reduces or disables nonessential motion.
- [ ] Interactions remain usable on desktop and mobile.

#### 009 — Accessibility and keyboard interaction hardening

- Type: AFK
- Status: Ready after 005, 006, 007, and 008
- Blocked by:
  - 005 — Implement adaptive sticky header navigation
  - 006 — Implement hero visual composition and pointer motion system
  - 007 — Implement scroll-linked atmosphere/background system
  - 008 — Add section-level interaction polish
- User stories covered: 18, 23, 26, 29, 44, 50

What to build:
- Audit and harden semantic structure, keyboard navigation, focus handling, reduced-motion behavior, and contrast across the animated landing template.

Acceptance criteria:
- [ ] Page uses semantic landmarks and meaningful section structure.
- [ ] Header dropdowns, mobile menu, and FAQ are keyboard-operable.
- [ ] Visible focus states are present for interactive controls.
- [ ] Reduced-motion behavior is verified for hero, header, section, and background interactions.
- [ ] Contrast is reviewed across all background themes.
- [ ] No essential content is conveyed only by animation.

#### 010 — Performance, build, and quality gate pass

- Type: AFK
- Status: Ready after 005, 006, 007, 008, and 009
- Blocked by:
  - 005 — Implement adaptive sticky header navigation
  - 006 — Implement hero visual composition and pointer motion system
  - 007 — Implement scroll-linked atmosphere/background system
  - 008 — Add section-level interaction polish
  - 009 — Accessibility and keyboard interaction hardening
- User stories covered: 40, 45, 46

What to build:
- Verify production build quality, test coverage, hydration scope, GPU-friendly animation behavior, and Lighthouse-oriented performance readiness.

Acceptance criteria:
- [ ] Production build completes successfully.
- [ ] Tests/checks pass for implemented modules.
- [ ] Initial JavaScript and hydration are limited to high-value interactive islands.
- [ ] Animations primarily use transform and opacity rather than layout-affecting properties.
- [ ] Lighthouse-oriented review targets 90+ desktop and mobile scores.
- [ ] No mandatory third-party image service or external visual asset dependency is introduced.

#### 011 — Design review against Patreon-inspired boundary

- Type: HITL
- Status: Ready after 006, 007, 008, and 009
- Blocked by:
  - 006 — Implement hero visual composition and pointer motion system
  - 007 — Implement scroll-linked atmosphere/background system
  - 008 — Add section-level interaction polish
  - 009 — Accessibility and keyboard interaction hardening
- User stories covered: 3, 4, 49, 50

What to build:
- Conduct a human review to confirm the template feels close enough to Patreon in mood and behavior while remaining clearly original and not copied.

Acceptance criteria:
- [ ] Human reviewer confirms the design feels appropriately premium and creator-economy oriented.
- [ ] Human reviewer confirms hero/header/background interactions meet the intended Patreon-inspired behavior category.
- [ ] Human reviewer confirms copy, visual assets, color system, typography, and layout details are distinguishable from Patreon.
- [ ] Any required design-boundary adjustments are documented as follow-up tasks.

#### 012 — Documentation and handoff update

- Type: AFK
- Status: Ready after 010 and 011
- Blocked by:
  - 010 — Performance, build, and quality gate pass
  - 011 — Design review against Patreon-inspired boundary
- User stories covered: 47, 48

What to build:
- Update project memory and handoff documentation with final tech stack, implementation decisions, constraints, testing commands, and future backlog.

Acceptance criteria:
- [ ] Project context docs reflect the implemented product direction and tech stack.
- [ ] Decision log records Astro-first, Next.js-out-of-scope, design-boundary, and animation responsibility decisions.
- [ ] Task list reflects completed and remaining work accurately.
- [ ] README or project docs explain how to install, run, build, and test the template.
- [ ] Future backlog captures non-v1 items such as multi-page expansion or external tracker publishing.

## Backlog

- [ ] Configure an external issue tracker if desired and label these issues `ready-for-agent`.
- [ ] Consider a future multi-page marketing expansion after v1.
- [ ] Consider a future Next.js variant only if project direction changes.

## Completed

- [x] Gather initial requirements with `grill-me`.
- [x] Create local PRD at `docs/PRD.md`.
- [x] Convert PRD into vertical-slice implementation issues in this task list.
- [x] 001 — Scaffold Astro-first Patreonic app shell.
- [x] 002 — Build design tokens, page shell, and section registry.
- [x] 003 — Create static landing-page content skeleton.
- [x] 004 — Build generated media card system and visual collage primitives.
- [x] 005 — Implement adaptive sticky header navigation.
- [x] 006 — Implement hero visual composition and pointer motion system.
