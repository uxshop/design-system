import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

export default {
	install(app) {
		app.component(Breadcrumb.name, Breadcrumb)
		app.component(BreadcrumbItem.name, BreadcrumbItem)
	}
}

export { Breadcrumb, BreadcrumbItem }
