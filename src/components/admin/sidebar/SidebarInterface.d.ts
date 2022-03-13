declare namespace SidebarInterface {
	interface Item {
		section: string
		name: string
		permissions: string
		to?: string
		nodes?: Item[]
		spacer?: boolean
		last?: boolean
		disabled?: boolean
	}
}
