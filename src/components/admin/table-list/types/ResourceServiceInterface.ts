export type ApiData = Record<string, string>
export interface ApiOutputGet {
	meta: string
	data: ApiData[]
	link: unknown
}

export interface ResourceServiceInterface {
	get(params: Record<string, string>): Promise<ApiOutputGet>
	delete(id: string): Promise<void>
	update(id: string, data: Record<string, string>): Promise<ApiOutputGet>
}
