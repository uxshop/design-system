export interface IVideo {
	video_id: string
	name?: string
	articles?: {
		name: string
		url: string
	}[]
}
