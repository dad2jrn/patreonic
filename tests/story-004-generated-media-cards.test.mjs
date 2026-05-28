import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 004 generated media card system', () => {
    it('publishes reusable generated media card variants for creator-economy concepts', async () => {
        const mediaCards = await import('../src/content/media-cards.ts');

        assert.deepEqual(
            mediaCards.generatedMediaCards.map((card) => card.variant),
            ['creator', 'post', 'video', 'tier', 'stat', 'community'],
        );

        for (const card of mediaCards.generatedMediaCards) {
            assert.match(card.id, /^[a-z][a-z0-9-]*$/);
            assert.ok(card.eyebrow.length > 1, `Expected ${card.id} to have an eyebrow`);
            assert.ok(card.title.length > 1, `Expected ${card.id} to have a title`);
            assert.ok(card.detail.length > 1, `Expected ${card.id} to have detail copy`);
        }
    });

    it('composes generated media cards into the homepage visual collage', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

        assert.match(homepage, /generatedMediaCards/);
        assert.match(homepage, /media-collage/);
        assert.match(homepage, /data-card-variant=\{card\.variant\}/);
        assert.match(homepage, /aria-label="Generated creator media collage"/);
    });

    it('uses CSS and HTML primitives for original visuals instead of external images', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        assert.doesNotMatch(homepage, /<img\b/i);
        assert.doesNotMatch(homepage, /https?:\/\//i);

        for (const selector of [
            '.generated-media-card',
            '[data-card-variant="creator"]',
            '[data-card-variant="post"]',
            '[data-card-variant="video"]',
            '[data-card-variant="tier"]',
            '[data-card-variant="stat"]',
            '[data-card-variant="community"]',
            '.generated-media-card::before',
            '.generated-media-card::after',
        ]) {
            assert.match(stylesheet, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });
});