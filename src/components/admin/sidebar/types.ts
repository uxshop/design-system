export interface SideBarItem {
	name: string
	isNew?: boolean
	to?: string
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
}

export type SideBarItemType = 'logo' | 'node' | 'footer' | string
