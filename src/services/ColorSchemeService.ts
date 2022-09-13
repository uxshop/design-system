export enum ColorScheme {
	'dark' = 'dark',
	'light' = 'light'
}

export default {
	get() {
		const system =
			window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
				? ColorScheme.dark
				: ColorScheme.light
		return localStorage.getItem('ds_color_scheme') ?? system
	}
}
