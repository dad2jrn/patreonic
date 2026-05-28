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

### 2026-05-27 - Story 003 static content skeleton

Decision:
- Patreonic now renders original static starter copy for the full v1 landing-page skeleton: hero, creator use cases, how it works, features, tier preview, community proof/testimonials, FAQ, and final CTA/footer.
- Story 003 content is keyed by the existing section registry IDs in `src/pages/index.astro`; `src/content/sections.ts` now exports a `LandingSectionId` union so content coverage stays type-checked against known anchors.
- The content skeleton uses simple responsive layout classes in `src/styles/global.css` rather than adding new components or animation dependencies in this slice.

Reason:
- Story 003 needed to replace placeholders with conversion-oriented, original creator-economy copy before generated visuals, adaptive navigation, and motion systems are layered in later issues.
- Keeping content tied to registry IDs preserves the Story 002 source of truth for anchors and future scroll/navigation behavior.

Consequences:
- Future section components can extract or replace the inline content map, but must preserve registry-backed anchors and original-copy constraints.
- Later generated media and motion slices should enhance the static hierarchy without requiring external assets or backend functionality.

### 2026-05-27 - Story 004 generated media card primitives

Decision:
- Patreonic uses a reusable generated media card registry in `src/content/media-cards.ts` for creator/avatar, post, video/media, tier, stat, and community concepts.
- The homepage composes those cards into a hero `media-collage` using semantic HTML and `data-card-variant` attributes.
- Visual treatments are CSS-generated in `src/styles/global.css` with gradients, pseudo-elements, and project design tokens instead of external images or image services.

Reason:
- Story 004 requires original media/card primitives that can support later hero composition, supporting sections, and motion slices without introducing external asset dependencies.
- Keeping variant metadata separate from page markup makes the card vocabulary reusable while preserving the Astro-first static page boundary.

Consequences:
- Later hero motion and section interaction work should enhance these generated cards rather than replacing them with remote images.
- Future visual refinements should keep the card variants distinguishable from Patreon-owned assets and continue using local CSS/HTML primitives unless a later decision changes the asset strategy.

### 2026-05-27 - Story 005 adaptive sticky header navigation

Decision:
- Patreonic renders a sticky adaptive header directly in `src/pages/index.astro`, using the existing `landingSections` registry for desktop links, mobile links, active-section targets, and section-themed dropdown labels.
- Header behavior uses a small inline browser script for scroll-state styling, `IntersectionObserver` active-section updates, mobile menu open/close state, Escape-to-close, and temporary `inert` handling for the main page while the mobile menu is open.
- Header presentation, dropdown focus/hover states, active link treatment, mobile menu animation, and visible focus states live in `src/styles/global.css`.

Reason:
- Story 005 requires navigation behavior that is observable on the static Astro page without introducing a React island or broad component extraction before the navigation contract is stable.
- Reusing the Story 002 section registry keeps anchors, labels, and future scroll-linked work aligned to one source of truth.

Consequences:
- Later accessibility hardening should review the mobile menu focus model and can extract the inline script into a dedicated component/module if the navigation grows.
- Future motion work should preserve reduced-motion behavior and avoid layout-heavy header animations.

### 2026-05-28 - Story 006 hero visual composition and pointer motion system

Decision:
- Patreonic reuses the Story 004 generated media cards as the hero visual field rather than adding external images or copied assets.
- `src/content/media-cards.ts` now includes depth and resting-position metadata so foreground, midground, and background cards can move at different intensities.
- The homepage script in `src/pages/index.astro` uses GSAP to animate CSS custom properties for pointer parallax, card tilt, and reset-on-leave behavior only for fine-pointer users who have not requested reduced motion.
- Touch/coarse-pointer and reduced-motion fallbacks are handled in `src/styles/global.css` with simplified/static transforms.

Reason:
- Story 006 requires a premium, Patreon-inspired motion category while preserving original assets, static-friendly Astro output, and reduced-motion accessibility constraints.
- Animating CSS custom properties keeps the resting composition declarative in CSS and card metadata while allowing GSAP to provide smooth pointer response.

Consequences:
- Future hero motion refinements should preserve the depth metadata contract and avoid layout-affecting animation properties.
- If hero interactions grow, the inline script can be extracted to a dedicated module or hydrated island, but the current slice keeps behavior colocated with the single-page template.
