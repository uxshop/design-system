import type { IResourceService, TApiData } from 'src/types/IApiResource'

export type TBulkActions = Array<{
	label: string
	variant?: string
	action(a: number[]): void
}>

export interface ITableListConfig {
	service: any
	customFilterService?: any
	customFilterPresets?: any
	customFilterResource?: string
	queryParams?: object
	onGet?(i: TApiData[] | null): void
	remove?(i: TApiData): Promise<void>
	omitFilters?: string[]
	hideCheckbox?: boolean
	empty?: string
	filters?: any
	sortable?: any
	bulk?: TBulkActions
	actions?: string[]
	placeholder?: string
}
