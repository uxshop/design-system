import type { IVariant } from '../types/ITypes'

export interface IAction {
	leadingIcon?: string
	label?: string
	onAction?(): void
	form?: string
	disabled?: boolean
	type?: string
	variant?: IVariant
	to?: any
	target?: '_blank' | '_self'
	class?: string
}
