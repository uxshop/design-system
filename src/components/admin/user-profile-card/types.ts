export interface IDropdownItem {
	text: string
	caption: string
	key?: string
	onAction?: () => void
	icon?: string
	to?: string | { name: string }
	href?: string
	target?: string
	component?: any
}
export interface UserCard {
	name: string
	image?: {
		src?: string
	}
}
