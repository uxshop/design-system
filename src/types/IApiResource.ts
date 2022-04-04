type TAllTypes = string | number | boolean
type AllTypes = string | number | boolean

export type TApiData = Record<string, TAllTypes>
export interface IApiMeta {
	current_page: number
	from: number
	last_page: number
	path: string
	per_page: number
	to: number
	total: number
}

export interface IApiResource {
	meta: IApiMeta
	data: TApiData[]
	link: unknown
}

export interface IResourceService {
	get(params: Record<string, AllTypes>): Promise<IApiResource>
	delete(id: number): Promise<void>
	update(id: number, data: Record<string, AllTypes>): Promise<IApiResource>
}
