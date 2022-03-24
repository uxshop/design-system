import type { ApiData, IResourceService } from './IResourceService'

export type TBulkActions = Array<{
	label: string
	variant?: string
	action(a: number[]): void
}>

export interface ITableListConfig {
	service: IResourceService
	queryParams: object
	onGet(i: ApiData[] | null): void
	remove(i: ApiData): Promise<void>
	omitFilters?: string[]
	hideCheckbox?: boolean
	empty?: string
	presetFilters?: Record<string, string>[]
	filters?: Record<string, string>
	bulk?: TBulkActions
	actions?: string[]
	placeholder?: string
}
