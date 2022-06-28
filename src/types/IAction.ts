import type { IVariant } from '../types/ITypes'

export interface IAction {
	leadingIcon?: string
	label?: string
	onAction?: any
	form?: string
	disabled?: boolean
	type?: string
	variant?: IVariant
	to?: any
}
