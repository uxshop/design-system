import type { ComponentOptions } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

export default {
	install(app: ComponentOptions) {
		app.component(Breadcrumb.name, Breadcrumb)
		app.component(BreadcrumbItem.name, BreadcrumbItem)
	}
}

export { Breadcrumb, BreadcrumbItem }
