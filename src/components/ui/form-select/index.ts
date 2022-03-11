import type { ComponentOptions } from 'vue'
import FormSelect from './FormSelect.vue'
import FormSelectOption from './FormSelectOption.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}FormSelect`, FormSelect)
		app.component(`${prefix}FormSelectOption`, FormSelectOption)
	}
}
