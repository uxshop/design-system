import Card from './Card.vue'
import CardItem from './CardItem.vue'
import CardTitle from './CardTitle.vue'

export default {
	install(app) {
		app.component('Card', Card)
		app.component('CardItem', CardItem)
		app.component('CardTitle', CardTitle)
	}
}

export { CardItem, CardTitle, Card }
