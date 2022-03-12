import Content404 from './Content404.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/Errors/404',
	component: Content404,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Content404 },
	setup() {
		return { args }
	},
	template: `
    <Content404 v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {}
