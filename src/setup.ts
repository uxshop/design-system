import directives from './directives'

export const DS = {
	install: (app, params = {}) => {
		app.use(directives)

		if (params.detectColorScheme) {
			const system = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			const colorScheme = localStorage.getItem('ds_color_scheme') ?? system
			localStorage.setItem('ds_color_scheme', colorScheme)
			document.documentElement.setAttribute('data-theme', colorScheme)
		}
	}
}
