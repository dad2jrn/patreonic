# Patreonic

Patreonic is an Astro-first landing template foundation for creator-platform and membership SaaS teams.

## Stack

- Astro 6 as the primary application framework
- TypeScript with Astro strict config
- React integration for future interactive islands
- Tailwind CSS 4 via the Vite plugin
- Motion for React and GSAP available for future interaction/animation slices
- Vitest for scaffold and behavior tests

Next.js is intentionally out of scope for v1.

## Local development

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Run tests:

```sh
npm test
```

Run type checks:

```sh
npm run typecheck
```

Build the static site:

```sh
npm run build
```

Run the full local verification gate:

```sh
npm run verify
```

## Quality gates

- `npm run verify` runs the complete local gate: tests, Astro type checks, and production build.
- The template keeps hydration limited to the static Astro shell plus the inline interaction script; no React client island is required for the current landing page.
- Motion is Lighthouse-oriented: interactive effects prefer `transform` and `opacity`, scroll work is scheduled with `requestAnimationFrame`, and scroll listeners are passive where possible.
- Visual cards and atmosphere layers use local CSS/HTML primitives, so no mandatory third-party image service or external asset dependency is required.
