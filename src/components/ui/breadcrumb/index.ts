import type { ComponentOptions } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}Breadcrumb`, Breadcrumb)
		app.component(`${prefix}BreadcrumbItem`, BreadcrumbItem)
	}
}

export { Breadcrumb, BreadcrumbItem }
