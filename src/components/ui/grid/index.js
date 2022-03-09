import Container from './container/Container.vue'
import Row from './row/Row.vue'
import Col from './col/Col.vue'

export default {
	install(app) {
		app.component('Container', Container)
		app.component('Row', Row)
		app.component('Col', Col)
	}
}
