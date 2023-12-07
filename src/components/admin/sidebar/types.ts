export interface Node {
	name: string
	to: string
	permissions: string
}

export interface SideBarItem {
	name: string
	to: string
	permissions: string
	section?: string
	icon?: string
	nodes?: Node[]
}
