import type { ComponentOptions } from 'vue'
import Aside from './Aside.vue'

export default {
	install(app: ComponentOptions) {
		app.component(Aside.name, Aside)
	}
}

export { Aside }
