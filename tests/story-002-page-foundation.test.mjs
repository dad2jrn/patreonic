import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 002 page foundation', () => {
    it('publishes a section registry with stable IDs, nav labels, and background themes', async () => {
        const { landingSections } = await import('../src/content/sections.ts');

        assert.deepEqual(
            landingSections.map((section) => section.id),
            ['hero', 'audiences', 'flow', 'features', 'tiers', 'community', 'faq', 'final-cta'],
        );

        for (const section of landingSections) {
            assert.match(section.id, /^[a-z][a-z0-9-]*$/);
            assert.ok(section.navLabel.length > 1, `Expected ${section.id} to have a nav label`);
            assert.match(section.backgroundTheme, /^theme-[a-z][a-z0-9-]*$/);
        }
    });

    it('renders placeholder page sections from the registry with anchors and theme metadata', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const { landingSections } = await import('../src/content/sections.ts');

        assert.match(homepage, /landingSections/);

        for (const section of landingSections) {
            assert.match(homepage, new RegExp(`id=\\{section\\.id\\}`));
            assert.match(homepage, new RegExp(`data-theme=\\{section\\.backgroundTheme\\}`));
            assert.ok(section.navLabel, `Expected ${section.id} to be navigation-ready`);
        }
    });

    it('defines original design tokens and reusable reduced-motion behavior', async () => {
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        for (const token of [
            '--color-ink',
            '--color-ember',
            '--color-plum',
            '--color-moss',
            '--font-display',
            '--font-body',
        ]) {
            assert.match(stylesheet, new RegExp(token));
        }

        assert.match(stylesheet, /prefers-reduced-motion:\s*reduce/);
        assert.match(stylesheet, /scroll-behavior:\s*auto/);
    });
});