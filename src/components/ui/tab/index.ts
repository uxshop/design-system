import type { ComponentOptions } from 'vue'
import Tab from './Tab.vue'
import TabItem from './TabItem.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}Tab`, Tab)
		app.component(`${prefix}TabItem`, TabItem)
	}
}
