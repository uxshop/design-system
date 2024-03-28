import type { IconType } from 'src/components/ui/icon/types'

export interface IPlatform {
	name: string
	description: string
	icon?: IconType
	url: string
}
