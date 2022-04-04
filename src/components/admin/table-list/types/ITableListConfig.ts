import type { IResourceService, TApiData } from 'src/types/IApiResource'

export type TBulkActions = Array<{
	label: string
	variant?: string
	action(a: number[]): void
}>

export interface ITableListConfig {
	service: IResourceService
	queryParams: object
	onGet(i: TApiData[] | null): void
	remove(i: TApiData): Promise<void>
	omitFilters?: string[]
	hideCheckbox?: boolean
	empty?: string
	presetFilters?: Record<string, string>[]
	filters?: Record<string, string>
	bulk?: TBulkActions
	actions?: string[]
	placeholder?: string
}
