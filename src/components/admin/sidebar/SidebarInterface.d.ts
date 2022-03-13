export namespace SidebarInterface {
	export interface Item {
		section: string
		name: string
		permissions: string
		to?: string
		nodes?: SidebarInterface.Item[]
		spacer?: boolean
		last?: boolean
		disabled?: boolean
	}
}
