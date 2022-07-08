import type { ITableListConfig } from 'src/types'

export interface ITableListState {
	queryParams: any
	omitFilters: any
	config: ITableListConfig
	tabs: any[]
	currentTab: any
	term: string | null
	omitFiltersValues: any
	fetchData(): void
	setQueryParams(params: any): void
	resetQueryParams(params: any): void
	removeFilter(params: any): void
	removeSelected(params: any): void
	toggleActiveSelected(i: boolean): void
	activeOne(item: any, i: boolean): void
	deleteOne(item: any): void
	clickRow(item: any): void
}
