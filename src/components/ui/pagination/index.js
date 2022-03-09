import Pagination from './Pagination.vue'
import PaginationItem from './PaginationItem.vue'

export default {
	install(app) {
		app.component('Pagination', Pagination)
		app.component('PaginationItem', PaginationItem)
	}
}
