import Sidebar from './Sidebar.vue'
import vueRouter from 'storybook-vue3-router'
import { menus, routes } from './Sidebar.mock'

export default {
	title: 'Components/Sidebar',
	component: Sidebar,
	argTypes: {}
}

const Template = (args) => ({
	components: { Sidebar },
	setup() {
		return {
			args
		}
	},
	template: `
    <Sidebar v-bind="args" />
  `
})

const permissionService = {
	has: (rule) => {
		if (rule === '') {
			return true
		}

		return true
	}
}

export const Default = Template.bind({})

Default.args = {
	menus: menus,
	permissionService: permissionService
}

Default.decorators = [vueRouter(routes)]
