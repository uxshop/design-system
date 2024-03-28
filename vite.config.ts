import { fileURLToPath, URL } from 'url'
import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx(), dts({rollupTypes: true})],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "design-system",
      fileName: "design-system",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    }
  }
})
