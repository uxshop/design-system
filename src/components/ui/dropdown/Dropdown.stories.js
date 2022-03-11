import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownItemButton from './DropdownItemButton.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Dropdown',
	component: Dropdown,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Dropdown, DropdownItem, DropdownItemButton },
	setup() {
		return { args }
	},
	template: `
    <div style="width: 200px">
      <Dropdown v-bind="args">
        <template #button-content>
          <button>#button-content</button>
        </template>
        <Dropdown-item>
          teste
        </Dropdown-item>
        <Dropdown-item-button>
          teste
        </Dropdown-item-button>
      </Dropdown>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
	label: 'Dropdown'
}
