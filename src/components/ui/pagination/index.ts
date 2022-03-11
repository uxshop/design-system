import type { ComponentOptions } from 'vue'
import Pagination from './Pagination.vue'
import PaginationItem from './PaginationItem.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}Pagination`, Pagination)
		app.component(`${prefix}PaginationItem`, PaginationItem)
	}
}
