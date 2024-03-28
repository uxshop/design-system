import type { Size, Target, Variant } from './Types'

export interface IAction {
	leadingIcon?: string
	label?: string
	onAction?(): void
	form?: string
	disabled?: boolean
	type?: string
	variant?: Variant
	to?: any
	target?: Target
	class?: string
  size?: Size
}
