import FormSelect from './FormSelect.vue'
import FormSelectOption from './FormSelectOption.vue'

export default {
	install(app) {
		app.component('FormSelect', FormSelect)
		app.component('FormSelectOption', FormSelectOption)
	}
}
