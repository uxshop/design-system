import Sidebar from './Sidebar.vue'
import vueRouter from 'storybook-vue3-router'
import menus from './Sidebar.mock'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/Sidebar',
	component: Sidebar,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
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

const routes = [
	{ path: '/home', name: 'home' },
	{ path: '/categories', name: 'categories' },
	{ path: '/products', name: 'products' },
	{ path: '/kits', name: 'kits' },
	{ path: '/colors', name: 'colors' },
	{ path: '/options', name: 'options' },
	{ path: '/features', name: 'features' },
	{ path: '/brands', name: 'brands' },
	{ path: '/stocks', name: 'stocks' },
	{ path: '/customers', name: 'customers' },
	{ path: '/customersgroups', name: 'customers.groups' },
	{ path: '/orders', name: 'orders' },
	{ path: '/drafts', name: 'drafts' },
	{ path: '/checkouts', name: 'checkouts' },
	{ path: '/coupons', name: 'coupons' },
	{ path: '/freight', name: 'freight' },
	{ path: '/buy_and_get', name: 'buy_and_get' },
	{ path: '/mailing', name: 'mailing' },
	{ path: '/variation_request', name: 'variation_request' },
	{ path: '/preferences', name: 'preferences' },
	{ path: '/themes', name: 'themes' },
	{ path: '/menus', name: 'menus' },
	{ path: '/marketplace', name: 'marketplace' },
	{ path: '/checkout', name: 'checkout' },
	{ path: '/pages', name: 'pages' },
	{ path: '/hotsites', name: 'hotsites' },
	{ path: '/posts', name: 'posts' },
	{ path: '/scripts', name: 'scripts' },
	{ path: '/myextensions', name: 'my-extensions' },
	{ path: '/extensions', name: 'extensions' },
	{ path: '/apis', name: 'apis' },
	{ path: '/payments', name: 'payments' },
	{ path: '/carriers', name: 'carriers' },
	{ path: '/warehouse', name: 'warehouse' },
	{ path: '/notifications', name: 'notifications' },
	{ path: '/users', name: 'users' },
	{ path: '/billing', name: 'billing' },
	{ path: '/redirects', name: 'redirects' },
	{ path: '/taxes', name: 'taxes' },
	{ path: '/files', name: 'files' },
	{ path: '/support', name: 'support' },
	{ path: '/reports', name: 'reports' },
	{ path: '/domains', name: 'domains' },
	{ path: '/genera', name: 'general' }
]

Default.decorators = [vueRouter(routes)]
