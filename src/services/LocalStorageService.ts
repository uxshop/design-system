export default {
	setObj: (key: string, val: any): void => {
		if (Array.isArray(val) || typeof val === 'object') {
			val = JSON.stringify(val)
		}

		localStorage.setItem(key, val)
	},
	getObj: (key: string): Record<string, any> | null => {
		let val = localStorage.getItem(key)
		if (val) {
			return JSON.parse(val)
		}

		return null
	},
	set: (key: string, val: any): void => {
		localStorage.setItem(key, val)
	},
	get: (key: string): string | null => {
		return localStorage.getItem(key)
	},
	remove: (key: string): void => {
		localStorage.removeItem(key)
	}
}
