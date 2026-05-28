# Project Context

## Project Name

patreonic
TBD

## One-Sentence Summary

Patreonic is an Astro-first, motion-ready landing template foundation for creator-platform and membership SaaS teams.

## Business / User Goal

Provide a polished, original creator-economy landing template that founders can customize without starting design and frontend implementation from scratch.

## Primary Users

Creator-platform founders, membership SaaS founders, and developers customizing static marketing templates.

## Core Problem

Teams want a premium, Patreon-inspired level of motion and polish while avoiding copied content, assets, layout, colors, or trade dress.

## Desired Outcome

A fast, static-friendly single-page Astro template with original copy, generated visuals, isolated interactive islands, and documented quality gates.

## Non-Goals

- Next.js implementation for v1.
- Backend services, authentication, checkout, billing, or CMS integration.
- Copied Patreon content, logos, screenshots, exact colors, exact typography pairing, or pixel-level layout reproduction.

## Constraints

- Astro-first architecture.
- React only where client-side interactivity benefits from hydration.
- No mandatory third-party image service or external visual asset dependency.
- Respect reduced-motion and accessibility needs in future interaction slices.

## Tech Stack

- Astro 6.3.8
- TypeScript 6
- React 19 with `@astrojs/react`
- Tailwind CSS 4 with `@tailwindcss/vite`
- Motion for React
- GSAP
- Vitest
- `astro check` / `@astrojs/check`

## External Services

None required for v1 scaffold.

## Data Model Notes

No backend data model exists in the scaffold. Landing-page section metadata is represented by the Story 002 section registry in `src/content/sections.ts`, including stable anchor IDs, navigation labels, background theme names, and a `LandingSectionId` union used by the Story 003 content skeleton. Static section copy currently lives in `src/pages/index.astro` and is keyed by the registry IDs. Story 004 generated media metadata lives in `src/content/media-cards.ts` with reusable creator/avatar, post, video/media, tier, stat, and community variants composed into the homepage as CSS/HTML-generated visual primitives. Story 005 header navigation also reads the same section registry to render desktop and mobile anchor links, active-section attributes, and dropdown panel labels. Story 006 extends the generated media card metadata with hero depth and resting-position fields so the homepage can render a layered GSAP pointer-motion field with foreground, midground, and background behavior. Story 007 reuses each section's `backgroundTheme` metadata to drive a fixed `scroll-atmosphere` layer whose active theme follows the observed section and whose ambient blobs move through CSS custom properties updated with `requestAnimationFrame`. Story 008 adds section-level interaction metadata in the homepage markup through `data-section-interaction`, `data-interaction-kind`, native FAQ `<details>` panels, and GSAP entrance/tap hooks while keeping styling and reduced-motion fallbacks in `src/styles/global.css`. Story 009 hardens the same page with semantic landmarks, a skip link, labelled sections, explicit essential-content markers, focus-return/focus-trap keyboard handling for the mobile menu, stronger FAQ focus styles, and contrast/reduced-motion fallbacks. Story 010 records quality-gate metadata in the homepage (`data-quality-gate` and `data-performance-budget`), verifies no Astro client hydration directives are required, documents Lighthouse-oriented performance constraints in `README.md`, and keeps generated visuals free of external asset dependencies. Story 011 adds a human design-review packet in `docs/DESIGN_REVIEW.md` and homepage review markers (`data-design-review`, `data-originality-boundary`, `data-interaction-category`) so a human reviewer can evaluate Patreon-inspired mood against explicit originality guardrails.

## Security / Privacy Notes

The scaffold is a static site with no authentication, user data collection, checkout, or backend integration.

## Open Questions

- Motion behavior remains for later visual and interaction issues.
- Story 003 copy is intentionally original starter copy and can be refined during later design/content passes.
- Story 005 uses a small inline Astro page script for header scroll state, active section observation, and mobile menu state; later accessibility hardening can extract or replace it if navigation complexity grows.
- Story 006 currently implements hero pointer motion in the same Astro page script using GSAP and CSS custom properties; later performance/accessibility hardening can extract it into a dedicated island or module if interaction complexity grows.
- Story 007 adds scroll-linked atmosphere behavior to the same inline Astro page script; later performance hardening can extract the shared scroll/observer behavior if the interaction layer grows.
- Story 008 keeps supporting-section interactions in native HTML plus the existing inline Astro page script; later accessibility hardening should review tabbable non-link cards and can replace them with more specific links/buttons if content actions become real navigation.
- Story 009 confirms the current single-page template has semantic landmarks and keyboard/focus hardening, but future real card destinations should replace generic tabbable informational cards with meaningful links or buttons.
- Story 010 confirms local quality gates pass and the current page avoids React client hydration, but a future Lighthouse run in a browser should still be performed during human design/release review.
- Story 011 prepares the design-boundary review but does not complete the subjective HITL approval; a human reviewer still needs to approve or document adjustments in `docs/DESIGN_REVIEW.md`.
