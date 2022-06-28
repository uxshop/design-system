import type { IVariant } from 'src/types/ITypes'

export interface IAction {
	leadingIcon?: string
	label?: string
	onAction?: any
	form?: string
	type?: string
	variant?: IVariant
	to?: object
}
