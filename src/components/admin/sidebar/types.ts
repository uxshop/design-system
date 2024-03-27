export interface SideBarItem {
	name: string
	isNew?: boolean
	to?: string
	params?: any
	href?: string
	key?: string
	isKeyActive?: boolean
	permissions?: string
	section?: string
	icon?: string
	caption?: string
	nodes?: SideBarItem[]
	active?: boolean
	disabled?: boolean
	spacer?: boolean
	last?: boolean
	dropdown?: boolean
	action?: () => void
}

export interface SidebarMobileMenu {
	icon: string
	title: string
	type: SideBarItemType
	to?: string
	params?: any
}

export type SideBarItemType = 'logo' | 'node' | 'footer' | 'action' | string
