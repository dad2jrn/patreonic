import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 006 hero visual composition and pointer motion system', () => {
    it('marks the hero collage as a layered motion field with foreground depth metadata', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

        assert.match(homepage, /class="media-collage hero-motion-field"/);
        assert.match(homepage, /data-hero-motion-field/);
        assert.match(homepage, /data-motion-depth=\{card\.depth\}/);
        assert.match(homepage, /--resting-x/);
        assert.match(homepage, /--resting-y/);
    });

    it('defines pointer parallax, reset-on-leave, touch fallback, and reduced-motion behavior', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        for (const expectedScriptBehavior of [
            'gsap',
            'pointer: fine',
            'prefers-reduced-motion: reduce',
            'pointermove',
            'pointerleave',
            'data-motion-depth',
            'gsap.to',
        ]) {
            assert.match(homepage, new RegExp(expectedScriptBehavior.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        for (const expectedStyle of [
            '.hero-motion-field',
            '.hero-motion-field::before',
            '.motion-depth-foreground',
            '.motion-depth-midground',
            '.motion-depth-background',
            '@media (pointer: coarse)',
            '@media (prefers-reduced-motion: reduce)',
            'transform:',
            'will-change: transform',
        ]) {
            assert.match(stylesheet, new RegExp(expectedStyle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });
});