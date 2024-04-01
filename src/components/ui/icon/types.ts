import type { MaterialIconsType } from './material-icons-type'
import type DSIcons from './snipets/ds-icons.json'

export type DSIconsType = keyof typeof DSIcons

export type IconType = MaterialIconsType | DSIconsType
