import type { ITableListConfig } from '../types/ITableListConfig'

export interface ITableListState {
	queryParams: any
	omitFilters: any
	config: ITableListConfig
	tabs: any[]
	currentTab: any
	term: string | null
	omitFiltersValues: any
	init(): void
	setQueryParams(params: any): void
	resetQueryParams(params: any): void
	removeFilter(params: any): void
	removeSelecteds(params: any): void
	toggleActiveSelecteds(i: boolean): void
	activeOne(item: any, i: boolean): void
	deleteOne(item: any): void
	clickRow(item: any): void
}
