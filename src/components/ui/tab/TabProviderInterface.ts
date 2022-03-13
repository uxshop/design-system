export interface TabProviderInterface {
	tabs: string[]
	activeTabIndex: number
	active(index: string, evt: unknown): void
}
