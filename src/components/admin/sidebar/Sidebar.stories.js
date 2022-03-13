import UiSidebar from './Sidebar.vue'
import vueRouter from 'storybook-vue3-router'
import menus from './Sidebar.mock'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/Sidebar',
	component: UiSidebar,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { UiSidebar },
	setup() {
		return {
			args
		}
	},
	template: `
    <ui-sidebar v-bind="args" />
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

const routes = [
	{ path: '/', name: 'home' },
	{ path: '/', name: 'categories' },
	{ path: '/', name: 'products' },
	{ path: '/', name: 'kits' },
	{ path: '/', name: 'colors' },
	{ path: '/', name: 'options' },
	{ path: '/', name: 'features' },
	{ path: '/', name: 'brands' },
	{ path: '/', name: 'stocks' },
	{ path: '/', name: 'customers' },
	{ path: '/', name: 'customers.groups' },
	{ path: '/', name: 'orders' },
	{ path: '/', name: 'drafts' },
	{ path: '/', name: 'checkouts' },
	{ path: '/', name: 'coupons' },
	{ path: '/', name: 'freight' },
	{ path: '/', name: 'buy_and_get' },
	{ path: '/', name: 'mailing' },
	{ path: '/', name: 'variation_request' },
	{ path: '/', name: 'preferences' },
	{ path: '/', name: 'themes' },
	{ path: '/', name: 'menus' },
	{ path: '/', name: 'checkout' },
	{ path: '/', name: 'pages' },
	{ path: '/', name: 'hotsites' },
	{ path: '/', name: 'posts' },
	{ path: '/', name: 'scripts' },
	{ path: '/', name: 'my-extensions' },
	{ path: '/', name: 'extensions' },
	{ path: '/', name: 'apis' },
	{ path: '/', name: 'payments' },
	{ path: '/', name: 'carriers' },
	{ path: '/', name: 'warehouse' },
	{ path: '/', name: 'notifications' },
	{ path: '/', name: 'users' },
	{ path: '/', name: 'billing' },
	{ path: '/', name: 'redirects' },
	{ path: '/', name: 'taxes' },
	{ path: '/', name: 'files' },
	{ path: '/', name: 'support' },
	{ path: '/', name: 'reports' },
	{ path: '/', name: 'domains' },
	{ path: '/', name: 'general' }
]

Default.decorators = [vueRouter(routes)]
