import type { ComponentOptions } from 'vue'
import Tab from './Tab.vue'
import TabItem from './TabItem.vue'

export default {
	install(app: ComponentOptions) {
		app.component('Tab', Tab)
		app.component('TabItem', TabItem)
	}
}
