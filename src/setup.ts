import type { ComponentOptions } from 'vue'
import directives from './directives'

export const DS = {
	install: (app: ComponentOptions, params: any = {}) => {
		app.use(directives)

		if (params.detectColorScheme) {
			const system = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			const colorScheme = localStorage.getItem('ds_color_scheme') ?? system
			document.documentElement.setAttribute('data-theme', colorScheme)
		}
	}
}
