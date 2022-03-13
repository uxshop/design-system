import type { ComponentOptions } from 'vue'
import Aside from './Aside.vue'

export default {
	install(app: ComponentOptions, { prefix }: { prefix: string }) {
		app.component(`${prefix}Aside`, Aside)
	}
}

export { Aside }
