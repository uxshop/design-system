import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
      environment: 'jsdom',
      coverage: {
        enabled: true,
        include: ['src/**/*.{ts,vue}'],
        exclude: [],
        reporter: ['html'],
      },
      exclude: [...configDefaults.exclude, 'e2e/**'],
    },
  })
);
