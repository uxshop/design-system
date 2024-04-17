import type { IconType } from 'src/components/ui/icon/types'

export interface IPlatform {
	name: string
	key: string
	active: boolean
	icon?: IconType
	url: string
}
