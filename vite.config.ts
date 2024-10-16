import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
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
      entry: {
        index: resolve(__dirname, './src/index.ts'),
        setup: resolve(__dirname, './src/setup.ts'),
        filters: resolve(__dirname, './src/filters.ts'),
        directives: resolve(__dirname, './src/directives.ts'),
      },
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
