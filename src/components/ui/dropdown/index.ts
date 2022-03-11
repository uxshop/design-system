import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownItemButton from './DropdownItemButton.vue'
import DropdownDivider from './DropdownDivider.vue'
import type { ComponentOptions } from 'vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}Dropdown`, Dropdown)
		app.component(`${prefix}DropdownItem`, DropdownItem)
		app.component(`${prefix}DropdownItemButton`, DropdownItemButton)
		app.component(`${prefix}DropdownDivider`, DropdownDivider)
	}
}

export { Dropdown, DropdownItem, DropdownItemButton, DropdownDivider }
