import type { TApiData } from 'src/types/IApiResource'

export type TBulkActions = Array<{
	label: string
	variant?: string
	onAction(a: number[]): void
}>

export interface DialogDelete {
	title?: string
	destructIcon?: string
	destructLabel?: string
	message?: {
		text: string
		concatMessage?: boolean
	}
}

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
	register?: string
	filters?: any
	sortable?: any
	bulk?: TBulkActions
	actions?: string[]
	placeholder?: string
	omitFiltersValues?: string[]
	dialogDelete?: DialogDelete
	hideTabsFilter?: boolean
	hideButtonFilter?: boolean
}
