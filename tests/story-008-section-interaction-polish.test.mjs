import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 008 section-level interaction polish', () => {
    it('marks supporting sections with interactive cards, accessible FAQ panels, and motion hooks', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

        for (const expectedMarkup of [
            'data-section-interaction',
            'tabindex="0"',
            'data-interaction-kind={getInteractionKind',
            'return "card"',
            'return "tier"',
            'return "testimonial"',
            'return "final-cta"',
            'class="faq-list"',
            '<details',
            '<summary>',
            'data-faq-panel',
            'aria-label="Frequently asked questions"',
        ]) {
            assert.match(homepage, new RegExp(expectedMarkup.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });

    it('defines polished hover, focus, tap, entrance, and reduced-motion section interaction behavior', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        for (const expectedScriptBehavior of [
            'data-section-interaction',
            'sectionInteractionItems',
            'IntersectionObserver',
            'gsap.fromTo',
            'pointerdown',
            'pointerup',
            'pointercancel',
            'prefers-reduced-motion: reduce',
        ]) {
            assert.match(homepage, new RegExp(expectedScriptBehavior.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        for (const expectedStyle of [
            '.content-card[data-section-interaction]',
            '.content-card[data-section-interaction]:hover',
            '.content-card[data-section-interaction]:focus-visible',
            '.content-card.is-pressed',
            '.faq-list',
            '.faq-panel',
            '.faq-panel[open]',
            '.section-grid[data-section-kind="tiers"]',
            '.content-card[data-interaction-kind="testimonial"]',
            '.content-card[data-interaction-kind="final-cta"]',
            'transition: transform',
            'will-change: transform, opacity',
            '@media (pointer: coarse)',
            '@media (prefers-reduced-motion: reduce)',
        ]) {
            assert.match(stylesheet, new RegExp(expectedStyle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });
});