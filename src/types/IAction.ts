import type { Variant } from './Types'

export interface IAction {
	leadingIcon?: string
	label?: string
	onAction?(): void
	form?: string
	disabled?: boolean
	type?: string
	variant?: Variant
	to?: any
	target?: '_blank' | '_self'
	class?: string
}
