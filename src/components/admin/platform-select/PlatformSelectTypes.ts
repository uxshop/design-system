import type { BadgeProps } from '../../ui/badge/Badge.vue'
import type { IconType } from '../../ui/icon/types'

export type PlatformLaunchStatusType = 'beta' | 'comingSoon'

export type BadgeConfigType = { [key in PlatformLaunchStatusType]: BadgeProps }

export interface IPlatform {
	name: string
	key: string
	active: boolean
	icon?: IconType
	url: string
	launchStatus?: PlatformLaunchStatusType
}
