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

No backend data model exists in the scaffold. Landing-page section metadata is represented by the Story 002 section registry in `src/content/sections.ts`, including stable anchor IDs, navigation labels, and background theme names.

## Security / Privacy Notes

The scaffold is a static site with no authentication, user data collection, checkout, or backend integration.

## Open Questions

- Exact section copy, generated media primitives, and motion behavior remain for later content and interaction issues.
