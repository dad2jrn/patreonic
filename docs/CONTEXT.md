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

No backend data model exists in the scaffold. Landing-page section metadata is represented by the Story 002 section registry in `src/content/sections.ts`, including stable anchor IDs, navigation labels, background theme names, and a `LandingSectionId` union used by the Story 003 content skeleton. Static section copy currently lives in `src/pages/index.astro` and is keyed by the registry IDs. Story 004 generated media metadata lives in `src/content/media-cards.ts` with reusable creator/avatar, post, video/media, tier, stat, and community variants composed into the homepage as CSS/HTML-generated visual primitives. Story 005 header navigation also reads the same section registry to render desktop and mobile anchor links, active-section attributes, and dropdown panel labels. Story 006 extends the generated media card metadata with hero depth and resting-position fields so the homepage can render a layered GSAP pointer-motion field with foreground, midground, and background behavior.

## Security / Privacy Notes

The scaffold is a static site with no authentication, user data collection, checkout, or backend integration.

## Open Questions

- Motion behavior remains for later visual and interaction issues.
- Story 003 copy is intentionally original starter copy and can be refined during later design/content passes.
- Story 005 uses a small inline Astro page script for header scroll state, active section observation, and mobile menu state; later accessibility hardening can extract or replace it if navigation complexity grows.
- Story 006 currently implements hero pointer motion in the same Astro page script using GSAP and CSS custom properties; later performance/accessibility hardening can extract it into a dedicated island or module if interaction complexity grows.
