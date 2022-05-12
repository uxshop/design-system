import { DateTime } from 'luxon'

const initials = (name: string) => {
	if (name) {
		name = name.trim()
		let out = name[0]

		const nameArr = name.split(/\s{1,3}/)

		if (nameArr.length > 1) {
			out += nameArr[nameArr.length - 1][0]
		}

		return out
	}
}

const datetime = (value: string, format: string, valueFormat = true) => {
	format = format || 'dd/MM/yyyy HH:mm'
	return DateTime.fromSQL(value).toFormat(format)
}

const number = (val: string, decimal = 2) => {
	if (val != undefined) {
		return parseFloat(val).toFixed(decimal)
	}
}

const zerofill = (val: number, fill = 2) => {
	if (val == 0) {
		return 0
	}
	if (val != undefined) {
		return String('000000' + val).slice(-fill)
	}
}

function slugify(val: string) {
	if (val) {
		val = val.replace(/^\s+|\s+$/g, '') // trim
		val = val.toLowerCase()

		const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
		const to = 'aaaaaeeeeeiiiiooooouuuunc------'

		for (let i = 0, l = from.length; i < l; i++) {
			val = val.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
		}

		val = val
			.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-') // collapse dashes
	} else {
		val = ''
	}

	return val
}

function truncate(val: string, length: number, ending = '') {
	if (!val) {
		return val
	}

	if (length == null) {
		length = 100
	}
	if (ending == null) {
		ending = '...'
	}

	if (val.length > length) {
		return val.substring(0, length - ending.length) + ending
	} else {
		return val
	}
}

export default {
	initials,
	datetime,
	number,
	zerofill,
	slugify,
	truncate
}

export { initials, datetime, number, zerofill, slugify, truncate }
