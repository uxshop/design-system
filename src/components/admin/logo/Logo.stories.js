import Logo from './Logo.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/Logo',
	component: Logo,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Logo },
	setup() {
		return { args }
	},
	template: `
    <Logo v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {}
