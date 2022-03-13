export interface TabProviderInterface {
	tabs: any[]
	activeTabIndex: number
	active(index: any, evt: any): void
}
