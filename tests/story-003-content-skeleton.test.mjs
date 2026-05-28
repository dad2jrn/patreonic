import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 003 static landing-page content skeleton', () => {
    it('renders original hero messaging with primary and secondary calls to action', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

        assert.match(homepage, /Turn audience momentum into a membership home/i);
        assert.match(homepage, /Launch the template/i);
        assert.match(homepage, /Explore the sections/i);
        assert.doesNotMatch(homepage, /Placeholder section/i);
        assert.doesNotMatch(homepage, /premium Astro landing shell/i);
    });

    it('publishes all Story 003 content sections through registry-backed anchors', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const { landingSections } = await import('../src/content/sections.ts');

        for (const { id } of landingSections) {
            assert.match(homepage, new RegExp(`id=\\{section\\.id\\}`));
            assert.ok(id.length > 1);
        }

        for (const expectedCopy of [
            'Creator types and use cases',
            'How Patreonic works',
            'Feature showcase',
            'Membership tier preview',
            'Community proof',
            'Creator testimonials',
            'Frequently asked questions',
            'Build a creator membership story that feels ready to ship',
        ]) {
            assert.match(homepage, new RegExp(expectedCopy, 'i'));
        }
    });

    it('keeps the content skeleton responsive through reusable content layout classes', async () => {
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        for (const selector of [
            '.section-grid',
            '.content-card',
            '.hero-actions',
            '@media (max-width: 720px)',
        ]) {
            assert.match(stylesheet, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });
});