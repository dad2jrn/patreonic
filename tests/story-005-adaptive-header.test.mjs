import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 005 adaptive sticky header navigation', () => {
    it('renders a sticky adaptive header with registry-backed desktop and mobile navigation', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const { landingSections } = await import('../src/content/sections.ts');

        assert.match(homepage, /<header\b[^>]*class="site-header/);
        assert.match(homepage, /data-header/);
        assert.match(homepage, /aria-label="Primary navigation"/);
        assert.match(homepage, /data-mobile-menu/);
        assert.match(homepage, /aria-controls="mobile-navigation"/);
        assert.match(homepage, /aria-expanded="false"/);

        assert.match(homepage, /href=\{`#\$\{section\.id\}`\}/);

        for (const section of landingSections) {
            assert.ok(section.navLabel.length > 1, `Expected ${section.id} to have a navigation label`);
        }

        assert.match(homepage, /\{section\.navLabel\}/);
    });

    it('defines observable scroll, active-section, dropdown, mobile menu, and focus behavior', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        assert.match(homepage, /IntersectionObserver/);
        assert.match(homepage, /is-scrolled/);
        assert.match(homepage, /aria-current/);
        assert.match(homepage, /data-nav-menu/);
        assert.match(homepage, /Escape/);
        assert.match(homepage, /inert/);

        for (const selector of [
            '.site-header',
            '.site-header.is-scrolled',
            '.nav-menu-panel',
            '.nav-item:hover .nav-menu-panel',
            '.nav-item:focus-within .nav-menu-panel',
            '.nav-link[aria-current="true"]',
            '.mobile-nav.is-open',
            ':focus-visible',
            '@media (max-width: 720px)',
            '@media (prefers-reduced-motion: reduce)',
        ]) {
            assert.match(stylesheet, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });
});