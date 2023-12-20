export interface Node {
	name: string
	to: string
	permissions?: string
	icon: string
	novelty?: boolean
	active?: boolean
	disabled?: boolean
	spacer?: boolean
	last?: boolean
}

export interface SideBarItem {
	name: string
	to: string
	permissions?: string
	section?: string
	icon?: string
	caption?: string
	nodes?: Node[]
	novelty?: boolean
	active?: boolean
	disabled?: boolean
	spacer?: boolean
	last?: boolean
	dropdown?: boolean
}
