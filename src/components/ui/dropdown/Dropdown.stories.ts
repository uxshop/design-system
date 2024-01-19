import type { Meta, StoryObj } from '@storybook/vue3'

import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownItemButton from './DropdownItemButton.vue'
import Button from '../button/Button.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
	title: 'Ui/Dropdown',
	component: Dropdown,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		right: true
	},
	argTypes: {
		dropUp: {
			control: 'boolean',
			defaultValue: false
		},
		right: {
			control: 'boolean',
			defaultValue: true
		},
		left: {
			control: 'boolean',
			defaultValue: false
		},
		closeOn: {
			control: 'boolean',
			defaultValue: false
		}
	}
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
	args: {},
	render: (args) => ({
		components: { Dropdown, DropdownItem, DropdownItemButton, Button },
		setup() {
			return { args }
		},
		template: `
    <div style="width: 200px; margin: 100px;">
      <Dropdown v-bind="args">
        <template #button-content>
          <Button>Dropdown</Button>
        </template>
        <DropdownItem>
          dropdown-item-slot
        </DropdownItem>
        <DropdownItemButton>
        dropdown-item-slot
        </DropdownItemButton>
      </Dropdown>
    </div>
    `
	})
}
