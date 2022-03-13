export interface TabProviderInterface {
	tabs: string[]
	activeTabIndex: number
	active(index: number, evt: unknown): void
}
