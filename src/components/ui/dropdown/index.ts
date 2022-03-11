import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownItemButton from './DropdownItemButton.vue'
import DropdownDivider from './DropdownDivider.vue'
import type { ComponentOptions } from 'vue'

export default {
	install(app: ComponentOptions) {
		app.component('Dropdown', Dropdown)
		app.component('DropdownItem', DropdownItem)
		app.component('DropdownItemButton', DropdownItemButton)
		app.component('DropdownDivider', DropdownDivider)
	}
}

export { Dropdown, DropdownItem, DropdownItemButton, DropdownDivider }
