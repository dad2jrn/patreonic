import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

describe('Story 010 performance, build, and quality gate pass', () => {
    it('keeps project quality commands and hydration boundaries explicit', async () => {
        const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');

        assert.equal(packageJson.scripts.build, 'astro build');
        assert.equal(packageJson.scripts.test, 'vitest run');
        assert.equal(packageJson.scripts.typecheck, 'astro check');
        assert.equal(packageJson.scripts.verify, 'npm run test && npm run typecheck && npm run build');

        assert.doesNotMatch(homepage, /client:(load|idle|visible|only|media)/);
        assert.match(homepage, /data-quality-gate="limited-hydration"/);
        assert.match(readme, /npm run verify/);
        assert.match(readme, /Lighthouse-oriented/);
    });

    it('documents transform/opacity animation safety and avoids mandatory external assets', async () => {
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
        const mediaCards = await readFile(new URL('../src/content/media-cards.ts', import.meta.url), 'utf8');
        const packageJson = await readFile(new URL('../package.json', import.meta.url), 'utf8');

        for (const expectedMarkup of [
            'data-quality-gate="gpu-friendly-motion"',
            'data-quality-gate="no-external-assets"',
            'data-performance-budget',
            'requestAnimationFrame',
            'passive: true',
        ]) {
            assert.match(homepage, new RegExp(expectedMarkup.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        for (const expectedStyle of [
            'transform:',
            'opacity:',
            'will-change: transform',
            'will-change: transform, opacity',
            'transition: opacity',
            '@media (prefers-reduced-motion: reduce)',
        ]) {
            assert.match(stylesheet, new RegExp(expectedStyle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        }

        assert.doesNotMatch(homepage, /https?:\/\//);
        assert.doesNotMatch(stylesheet, /url\(['"]?https?:\/\//);
        assert.doesNotMatch(mediaCards, /https?:\/\//);
        assert.doesNotMatch(packageJson, /cloudinary|imgix|unsplash|pexels|lottie/i);
    });
});