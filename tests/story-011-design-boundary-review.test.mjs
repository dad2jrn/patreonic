import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 011 design review against Patreon-inspired boundary', () => {
    it('provides a human review packet with explicit inspiration and originality criteria', async () => {
        const reviewPacket = await readFile(new URL('../docs/DESIGN_REVIEW.md', import.meta.url), 'utf8');

        for (const expectedSection of [
            '# Design Review: Patreon-Inspired Boundary',
            '## Human reviewer checklist',
            'premium and creator-economy oriented',
            'hero/header/background interactions',
            'distinguishable from Patreon',
            '## Inspiration boundary',
            '## Originality guardrails',
            '## Follow-up adjustments',
            '- [ ]',
        ]) {
            assert.match(reviewPacket, new RegExp(expectedSection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        for (const forbiddenCopyBoundary of [
            'no copied Patreon content',
            'no Patreon logos',
            'no screenshots',
            'no exact colors',
            'no exact typography pairing',
            'no pixel-level layout reproduction',
        ]) {
            assert.match(reviewPacket, new RegExp(forbiddenCopyBoundary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
        }
    });

    it('marks the homepage and docs with observable design-boundary review contracts', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const tasks = await readFile(new URL('../docs/TASKS.md', import.meta.url), 'utf8');
        const decisions = await readFile(new URL('../docs/DECISIONS.md', import.meta.url), 'utf8');

        for (const expectedMarkup of [
            'data-design-review="patreon-inspired-original"',
            'data-originality-boundary="no-copied-assets"',
            'data-interaction-category="creator-economy-premium"',
            'Patreon-inspired mood, original execution',
        ]) {
            assert.match(homepage, new RegExp(expectedMarkup.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        assert.match(tasks, /Design review packet prepared/);
        assert.match(tasks, /docs\/DESIGN_REVIEW\.md/);
        assert.match(tasks, /Human reviewer confirms/);
        assert.match(decisions, /Story 011 design review packet/);
        assert.match(decisions, /human reviewer/);
    });
});