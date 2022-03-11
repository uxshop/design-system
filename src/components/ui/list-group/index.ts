import type { ComponentOptions } from 'vue'
import ListGroup from './ListGroup.vue'
import ListGroupItem from './ListGroupItem.vue'

export default {
	install(app: ComponentOptions) {
		app.component('ListGroup', ListGroup)
		app.component('ListGroupItem', ListGroupItem)
	}
}
