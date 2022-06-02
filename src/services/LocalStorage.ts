export default {
	setObj: (key: string, val: string | object | string[]): void => {
		if (Array.isArray(val) || typeof val === 'object') {
			val = JSON.stringify(val)
		}

		localStorage.setItem(key, val)
	},
	getObj: (key: string): Record<string, string> | null => {
		const val = localStorage.getItem(key)
		if (val) {
			return JSON.parse(val)
		}

		return null
	},
	set: (key: string, val: string): void => {
		localStorage.setItem(key, val)
	},
	get: (key: string): string | null => {
		return localStorage.getItem(key)
	},
	remove: (key: string): void => {
		localStorage.removeItem(key)
	}
}
