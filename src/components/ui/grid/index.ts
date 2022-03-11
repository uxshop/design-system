import Container from './container/Container.vue'
import Row from './row/Row.vue'
import Col from './col/Col.vue'
import type { ComponentOptions } from 'vue'

export default {
	install(app: ComponentOptions) {
		app.component('Container', Container)
		app.component('Row', Row)
		app.component('Col', Col)
	}
}
