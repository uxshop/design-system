export interface TabProviderInterface {
	tabs: string[]
	activeTabIndex: number | string
	active(index: number, evt: unknown): void
}
