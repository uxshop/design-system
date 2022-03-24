type TAllTypes = string | number | boolean

export type ApiData = Record<string, TAllTypes>

export interface ApiOutputGet {
	meta: string
	data: ApiData[]
	link: unknown
}

type AllTypes = string | number | boolean

export interface IResourceService {
	get(params: Record<string, AllTypes>): Promise<ApiOutputGet>
	delete(id: number): Promise<void>
	update(id: number, data: Record<string, AllTypes>): Promise<ApiOutputGet>
}
