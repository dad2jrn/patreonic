import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 009 accessibility and keyboard interaction hardening', () => {
    it('renders semantic landmarks, labelled sections, and explicit non-animation content affordances', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const { landingSections } = await import('../src/content/sections.ts');

        assert.match(homepage, /<header\b[^>]*role="banner"/);
        assert.match(homepage, /<main\b[^>]*id="main-content"[^>]*role="main"/);
        assert.match(homepage, /<footer\b[^>]*role="contentinfo"/);
        assert.match(homepage, /class="skip-link"/);
        assert.match(homepage, /href="#main-content"/);
        assert.match(homepage, /aria-labelledby=\{`\$\{section\.id\}-title`\}/);
        assert.match(homepage, /id=\{`\$\{section\.id\}-title`\}/);
        assert.match(homepage, /data-essential-content/);

        for (const section of landingSections) {
            assert.ok(section.navLabel.length > 1, `Expected ${section.id} to keep a meaningful section label`);
        }
    });

    it('hardens keyboard menu state, focus return, reduced motion gates, and contrast/focus styles', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        for (const expectedScriptBehavior of [
            'focusableMobileMenuItems',
            'previouslyFocusedElement',
            'restoreFocus: true',
            'event.key === "Tab"',
            'event.key === "Home"',
            'event.key === "End"',
            'event.key === "Enter"',
            'event.key === " "',
            'reducedMotion.matches',
            'finePointer.matches',
        ]) {
            assert.match(homepage, new RegExp(expectedScriptBehavior.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        for (const expectedStyle of [
            '.skip-link',
            '.skip-link:focus-visible',
            '.mobile-menu-toggle[aria-expanded="true"]',
            '.faq-panel summary:focus-visible',
            'color-mix(in srgb, white, transparent 8%)',
            '@media (prefers-contrast: more)',
            '@media (prefers-reduced-motion: reduce)',
            'outline: 0.18rem solid var(--color-sunrise)',
            'transition-duration: 0.001ms !important',
        ]) {
            assert.match(stylesheet, new RegExp(expectedStyle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }
    });
});