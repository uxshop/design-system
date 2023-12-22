export interface SideBarItem {
	name: string
	to?: string
	key?: string
	isKeyActive?: boolean
	permissions?: string
	section?: string
	icon?: string
	caption?: string
	nodes?: SideBarItem[]
	novelty?: boolean
	active?: boolean
	disabled?: boolean
	spacer?: boolean
	last?: boolean
	dropdown?: boolean
}

export type SideBarItemType = 'logo' | 'node' | 'footer' | string
