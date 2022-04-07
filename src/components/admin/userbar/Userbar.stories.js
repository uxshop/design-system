import Userbar from './Userbar.vue'
import vueRouter from 'storybook-vue3-router'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/Userbar',
	component: Userbar,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Userbar },
	setup() {
		return { args }
	},
	template: `
    <Userbar v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	user: {
		name: 'Maicol Bruski'
	},
	slug: 'locaweb',
	breadcrumb: [
		{
			name: 'catálogo',
			to: 'brands'
		},
		{
			name: 'marcas',
			to: 'brands'
		}
	],
	dropdown: [{ text: 'My Store', icon: 'local_mall' }, { type: 'divider' }, { text: 'User', to: "{ name: 'users' }" }]
}

Default.decorators = [
	vueRouter([
		{ path: '/', name: 'brands' },
		{ path: '/', name: 'home' }
	])
]
