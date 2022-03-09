import UiDropdown from './Dropdown.vue'
import UiDropdownItem from './DropdownItem.vue'
import UiDropdownItemButton from './DropdownItemButton.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Dropdown',
  component: UiDropdown,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiDropdown, UiDropdownItem, UiDropdownItemButton },
  setup() {
    return { args }
  },
  template: `
    <div style="width: 200px">
      <ui-dropdown v-bind="args">
        <template #button-content>
          <button>#button-content</button>
        </template>
        <ui-dropdown-item>
          teste
        </ui-dropdown-item>
        <ui-dropdown-item-button>
          teste
        </ui-dropdown-item-button>
      </ui-dropdown>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Dropdown',
}
