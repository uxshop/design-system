import type { ResourceServiceInterface } from './ResourceServiceInterface'

export default interface TableListConfigInterface {
	service: ResourceServiceInterface
	queryParams: object
	onGet(i: Record<string, string> | null): void
	remove(i: string): Promise<void>
	omitFilters?: string[]
	hideCheckbox?: boolean
	empty?: string
	presetFilters?: Record<string, string>[]
	filters?: Record<string, string>
	bulk?: string[]
	actions?: string[]
	placeholder?: string
}
