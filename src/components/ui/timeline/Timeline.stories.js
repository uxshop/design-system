import Timeline from './Timeline.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Timeline',
	component: Timeline,
	args: {},
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Timeline },
	setup() {
		return { args }
	},
	template: `
    <Timeline v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	modelValue: [
		{
			date: '01 abril, 2022 às 23:11h',
			title: 'Hello work',
			text: 'Develop an online store of electronic devices for the provided layout, as well as develop a mobile version of it. The must be compatible with any CMS.Develop an online store of electronic devices for the provided layout, as well as develop a mobile version of it. The must be compatible with any CMS.'
		},
		{
			date: '02 abril, 2022 às 23:11h',
			title: 'Hello work',
			titleTo: { name: 'orders' },
			text: 'Develop an online store of electronic devices for the provided layout, as well as develop a mobile version of it. The must be compatible with any CMS.Develop an online store of electronic devices for the provided layout, as well as develop a mobile version of it. The must be compatible with any CMS.'
		}
	]
}
