import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'vitest';

async function readJson(path) {
    return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

describe('Patreonic app scaffold contract', () => {
    it('declares the approved Astro-first toolchain and developer scripts', async () => {
        const packageJson = await readJson('package.json');
        const allDependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
        };

        assert.equal(packageJson.type, 'module');
        assert.equal(packageJson.scripts.dev, 'astro dev');
        assert.equal(packageJson.scripts.build, 'astro build');
        assert.equal(packageJson.scripts.test, 'vitest run');
        assert.equal(packageJson.scripts.verify, 'npm run test && npm run typecheck && npm run build');
        assert.equal(packageJson.scripts.typecheck, 'astro check');

        for (const dependencyName of [
            'astro',
            '@astrojs/react',
            'typescript',
            'react',
            'react-dom',
            'tailwindcss',
            '@tailwindcss/vite',
            'motion',
            'gsap',
            'vitest',
        ]) {
            assert.ok(allDependencies[dependencyName], `Expected ${dependencyName} to be declared`);
        }

        assert.equal(allDependencies.next, undefined, 'Next.js is out of scope for v1');
    });

    it('documents the Astro version decision for future maintainers', async () => {
        const decisions = await readFile(new URL('../docs/DECISIONS.md', import.meta.url), 'utf8');

        assert.match(decisions, /Astro-first/i);
        assert.match(decisions, /Astro 6|latest stable Astro/i);
        assert.match(decisions, /Next\.js.*out of scope|Next\.js-out-of-scope/i);
    });

    it('provides the minimal Astro app shell files with Patreonic homepage content', async () => {
        const astroConfig = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8');
        const tsConfig = await readFile(new URL('../tsconfig.json', import.meta.url), 'utf8');
        const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
        const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

        assert.match(astroConfig, /defineConfig/);
        assert.match(astroConfig, /@astrojs\/react/);
        assert.match(astroConfig, /@tailwindcss\/vite/);
        assert.match(tsConfig, /astro\/tsconfigs\/strict/);
        assert.match(homepage, /Patreonic/);
        assert.match(homepage, /creator/i);
        assert.match(homepage, /global\.css/);
        assert.match(stylesheet, /tailwindcss/);
    });
});