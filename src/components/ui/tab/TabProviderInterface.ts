export interface TabProviderInterface {
	tabs: any
	activeTabIndex: number | string
	active(index: number | string, evt?: unknown): void
}
