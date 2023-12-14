export interface IDropdownItem {
	text?: string
	onAction?: () => void
	icon?: string
	to?: string | { name: string }
	href?: string
	target?: string
}
export interface UserCard {
	name: string
	image?: {
		src?: string
	}
}
