import { defineConfig } from 'vitest/config';
import type { UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig as UserConfig,
    defineConfig({
        test: {
            globals: true,
            setupFiles: ['@vitest/web-worker', 'dotenv/config', './tests/setup.js'],
            environment: 'happy-dom',
            passWithNoTests: true,
        },
    }),
);
