import { omit } from 'lodash'

export default (query: Record<string, string>, omitter: string[] = []) => {
	const newQuery: Record<string, string> = omit(query, omitter)
	const params: string[] = []
	Object.keys(newQuery).map((key: string) => {
		if (newQuery[key] != '' && newQuery[key] != null) {
			params.push(encodeURIComponent(key) + '=' + encodeURIComponent(newQuery[key]))
		}
	})
	let queryAppend = ''
	if (params.length) {
		queryAppend = `?${params.join('&')}`
	}
	history.replaceState({}, '', `${window.location.pathname}${queryAppend}`)
}
