import type { ComponentOptions } from 'vue'
import ListGroup from './ListGroup.vue'
import ListGroupItem from './ListGroupItem.vue'
import ListGroupItemButton from './ListGroupItemButton.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}ListGroup`, ListGroup)
		app.component(`${prefix}ListGroupItem`, ListGroupItem)
		app.component(`${prefix}ListGroupItemButton`, ListGroupItemButton)
	}
}
