import type { ComponentOptions } from 'vue'
import Aside from './Aside.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}Aside`, Aside)
	}
}

export { Aside }
