import { resolve, parse } from 'path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { exit } from 'process';
import { globSync } from 'glob';

function forceEnd() {
  return {
    name: 'force-end',

    writeBundle: () => {
      setTimeout(() => exit(0), 400);
    },
  };
}

/**
 * List all entry should be exported
 */
const getEntries = (): Record<string, string> => {
  const list = globSync(resolve(__dirname, './src/components/**/*.vue'));
  const remaped: Record<string, string> = {};

  list.forEach((item) => {
    remaped[parse(item).name.toLowerCase()] = resolve(__dirname, item);
  });

  return {
    index: resolve(__dirname, './src/index.ts'),
    setup: resolve(__dirname, './src/setup.ts'),
    filters: resolve(__dirname, './src/filters.ts'),
    directives: resolve(__dirname, './src/directives.ts'),
    ...remaped,
  };
};

export default defineConfig({
  plugins: [vue(), vueJsx(), libInjectCss(), forceEnd()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    lib: {
      name: 'design-system',
      formats: ['es'],
      entry: getEntries(),
    },
    cssCodeSplit: true,
    copyPublicDir: false,
    minify: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        preserveModules: false,
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: (entry) => {
          return entry.facadeModuleId?.includes('src/components') ? 'components/[name].js' : '[name].js';
        },
      },
    },
  },
});
