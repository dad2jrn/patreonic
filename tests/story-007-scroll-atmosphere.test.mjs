import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 007 scroll-linked atmosphere/background system', () => {
    it('renders registry-backed atmosphere state and section background themes', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const { landingSections } = await import('../src/content/sections.ts');

        assert.match(homepage, /class="scroll-atmosphere"/);
        assert.match(homepage, /data-scroll-atmosphere/);
        assert.match(homepage, /data-active-theme=\{landingSections\[0\]\.backgroundTheme\}/);
        assert.match(homepage, /data-theme=\{section\.backgroundTheme\}/);

        for (const section of landingSections) {
            assert.ok(section.backgroundTheme.startsWith('theme-'), `Expected ${section.id} to declare a theme token`);
        }
    });

    it('defines scroll-linked theme transitions, atmospheric layers, and reduced-motion fallback', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        for (const expectedScriptBehavior of [
            'data-scroll-atmosphere',
            'data-active-theme',
            'data-theme',
            'requestAnimationFrame',
            '--atmosphere-progress',
            '--atmosphere-drift',
            'prefers-reduced-motion: reduce',
        ]) {
            assert.match(homepage, new RegExp(expectedScriptBehavior.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        for (const expectedStyle of [
            '.scroll-atmosphere',
            '.scroll-atmosphere::before',
            '.scroll-atmosphere::after',
            '[data-active-theme="theme-ember"]',
            '[data-active-theme="theme-plum"]',
            '[data-active-theme="theme-indigo"]',
            '[data-active-theme="theme-moss"]',
            '[data-active-theme="theme-copper"]',
            '[data-active-theme="theme-teal"]',
            '[data-active-theme="theme-ink"]',
            '[data-active-theme="theme-sunrise"]',
            'transition: opacity',
            'transform:',
            'will-change: transform, opacity',
            '@media (prefers-reduced-motion: reduce)',
        ]) {
            assert.match(stylesheet, new RegExp(expectedStyle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });
});