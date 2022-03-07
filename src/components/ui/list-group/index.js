import ListGroup from './ListGroup.vue'
import ListGroupItem from './ListGroupItem.vue'

export default {
	install(app) {
		app.component('ListGroup', ListGroup)
		app.component('ListGroupItem', ListGroupItem)
	}
}
