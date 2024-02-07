import type { Meta, StoryObj } from '@storybook/vue3'

import Sidebar from './Sidebar.vue'
import Layout from '../layout/Layout.vue'
import menus from './Sidebar.mock'
import type { SideBarItem } from './types'
import { provide, reactive } from 'vue'

const meta = {
	title: 'Ui/Sidebar',
	component: Sidebar,
	tags: ['autodocs'],
	args: {
		menus,
		isActive: (node: SideBarItem, isOnlyChildren?: boolean) => false
	},
	argTypes: {}
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: { Sidebar, Layout },
		setup() {
			function isActive(node: SideBarItem, isOnlyChildren?: boolean) {
				if (isOnlyChildren) return !!node.nodes?.some(isNodeActive)
				return node.nodes?.some(isNodeActive) || isNodeActive(node)
			}

			function isNodeActive(node: SideBarItem) {
				const { key } = node
				return args.menus.some((menu) => {
					return menu.key === key || menu.nodes?.some((node) => node.key === key)
				})
			}

			const menu = reactive({
				open: false,
				toggle: () => {
					menu.open = !menu.open

					if (menu.open) {
						document.body.classList.add('is-menu-open')
					} else {
						document.body.classList.remove('is-menu-open')
					}
				}
			})

			provide('menu', menu)
			return { args, isActive }
		},
		template: `
    <div style="height: 500px; position: sticky; top: 0;">
      <Sidebar v-bind="args" :isActive="isActive">
        <template #logo>
          <div class="logo" style="height: 40px;" scoped>
            <img style="height: 100%; display: block;" src="./logo.svg" />
          </div>
        </template>
      </Sidebar>
    </div>
    `
	})
}
