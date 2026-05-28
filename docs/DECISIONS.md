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

### 2026-05-28 - Story 007 scroll-linked atmosphere/background system

Decision:
- Patreonic now renders a fixed, decorative `scroll-atmosphere` layer in `src/pages/index.astro`, initialized from the first section's registry-backed `backgroundTheme`.
- The existing section observer updates the atmosphere layer's `data-active-theme` as major landing sections become active.
- Scroll progress updates are scheduled with `requestAnimationFrame` and written to CSS custom properties (`--atmosphere-progress` and `--atmosphere-drift`) so atmospheric blobs move through transform/opacity-friendly CSS.
- Reduced-motion users keep static/simplified atmosphere behavior through the global `prefers-reduced-motion: reduce` stylesheet rules.

Reason:
- Story 007 requires smooth, original section-driven background transitions without introducing external assets or layout-thrashing scroll handlers.
- Reusing the section registry keeps atmosphere themes aligned with the same source of truth used by content and navigation.

Consequences:
- Future background or section-interaction work should extend the registry-backed theme contract rather than hard-coding per-section behavior elsewhere.
- If scroll-linked behavior expands, the shared observer/scroll script can be extracted from `src/pages/index.astro` into a dedicated module while preserving the public `data-theme` and `data-active-theme` contract.

### 2026-05-28 - Story 008 section-level interaction polish

Decision:
- Patreonic adds supporting-section interaction polish through semantic/static Astro markup, native FAQ `<details>` disclosures, and `data-section-interaction` / `data-interaction-kind` hooks in `src/pages/index.astro`.
- The existing inline page script handles lightweight tap pressed state and GSAP entrance reveals for section interaction items, gated by `prefers-reduced-motion`.
- Hover, focus, tap, tier, testimonial, final CTA, FAQ, coarse-pointer, and reduced-motion styles live in `src/styles/global.css` without adding new external assets or backend behavior.

Reason:
- Story 008 requires polished section interactions while preserving the Astro-first static page boundary and avoiding unnecessary React hydration for simple cards and native FAQ disclosure behavior.
- Native `<details>` keeps FAQ open/close behavior accessible by default and supports later accessibility hardening.

Consequences:
- Later Story 009 accessibility work should review whether tabbable informational cards should become real links/buttons once destinations or actions exist.
- If the shared inline script grows further, section interaction, navigation, hero motion, and atmosphere behavior are candidates for extraction into dedicated modules while preserving the public data-attribute contracts.

### 2026-05-28 - Story 009 accessibility and keyboard interaction hardening

Decision:
- Patreonic now exposes explicit semantic landmarks in `src/pages/index.astro`: skip link, `role="banner"`, `role="main"`, `role="contentinfo"`, labelled sections, and `data-essential-content` markers for copy that must not depend on animation.
- Mobile navigation now preserves the previously focused element, moves focus into the open menu, supports Tab wrapping, Escape close with focus restore, and Home/End keyboard shortcuts.
- `src/styles/global.css` includes skip-link visibility, stronger FAQ summary focus treatment, expanded reduced-motion fallbacks, and a `prefers-contrast: more` pass.

Reason:
- Story 009 required hardening accessibility after motion, atmosphere, header, and section interaction slices were in place.
- The current page can remain Astro-first and static while improving keyboard and assistive-technology behavior through semantic markup and lightweight browser scripting.

Consequences:
- Future real destinations or actions should replace generic tabbable informational cards with actual anchors/buttons.
- If mobile navigation complexity grows further, the focus-management script is a candidate for extraction into a small module or island while preserving the public markup contract.

### 2026-05-28 - Story 010 performance, build, and quality gates

Decision:
- Patreonic records performance/quality intent in homepage markup with `data-quality-gate` and `data-performance-budget` attributes for limited hydration, GPU-friendly motion, and no external generated-media assets.
- `README.md` now documents the full verification command, limited-hydration boundary, transform/opacity animation preference, passive/`requestAnimationFrame` scroll work, and no mandatory third-party image service.
- The local quality gate remains `npm run verify`, covering Vitest, `astro check`, and production `astro build`.

Reason:
- Story 010 required making production build readiness and performance assumptions observable and testable without adding external Lighthouse tooling to the local scaffold.
- Keeping the current page free of Astro client hydration directives preserves the static-friendly v1 architecture while still allowing inline script interactions where they provide value.

Consequences:
- Browser-based Lighthouse review remains a human/release activity, especially for final desktop/mobile scoring.
- Future interactive islands should be justified against the limited-hydration quality gate and covered by tests/docs when introduced.

### 2026-05-28 - Story 011 design review packet

Decision:
- Patreonic now has a human design-review packet in `docs/DESIGN_REVIEW.md` that separates inspiration criteria from originality guardrails.
- The homepage records the intended review boundary with `data-design-review="patreon-inspired-original"`, `data-originality-boundary="no-copied-assets"`, and `data-interaction-category="creator-economy-premium"`.
- Story 011 remains a human-in-the-loop task; tests verify that the review packet and observable review contracts exist, not that a human reviewer has approved the design.

Reason:
- Story 011 requires human judgment about whether the template feels premium and creator-economy oriented while remaining distinguishable from Patreon.
- A review packet makes the human reviewer decision explicit, repeatable, and documentable without falsely automating subjective design/legal/trade-dress judgment.

Consequences:
- A human reviewer must still approve or request adjustments before Story 011 acceptance criteria can be checked off.
- Any requested boundary adjustments should be documented in `docs/DESIGN_REVIEW.md` before implementation changes are made.
