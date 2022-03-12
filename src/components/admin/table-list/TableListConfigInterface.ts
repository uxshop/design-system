export default interface TableListConfigInterface {
	service: any
	queryParams: any
	onGet(i: Record<string, any> | null): void
	remove(i: any): Promise<void>
	omitFilters?: string[]
	hideCheckbox?: boolean
	empty?: string
	presetFilters?: Record<string, any>[]
	filters?: Record<string, any>
	bulk: any
	actions?: string[]
	placeholder?: string
}
