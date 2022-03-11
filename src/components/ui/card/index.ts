import type { ComponentOptions } from 'vue'
import Card from './Card.vue'
import CardItem from './CardItem.vue'
import CardTitle from './CardTitle.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}Card`, Card)
		app.component(`${prefix}CardItem`, CardItem)
		app.component(`${prefix}CardTitle`, CardTitle)
	}
}

export { CardItem, CardTitle, Card }
