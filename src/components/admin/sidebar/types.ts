import type { IconType } from 'src/components/ui/icon/types'

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
	icon?: IconType
	caption?: string
	nodes?: SideBarItem[]
	active?: boolean
	disabled?: boolean
	spacer?: boolean
	last?: boolean
	dropdown?: boolean
	action?: () => void
	customClass?: string
}

export interface SidebarMobileMenu {
	icon: IconType
	title: string
	type: SideBarItemType
	to?: string
	params?: any
}

export type SideBarItemType = 'logo' | 'node' | 'footer' | 'action' | string
