import StatsGroup from './StatsGroup.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/StatsGroup',
	component: StatsGroup,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { StatsGroup },
	setup() {
		return { args }
	},
	template: `
    <StatsGroup v-bind="args">
      Loren ipsum
    </StatsGroup>
  `
})

export const Default = Template.bind({})
Default.args = {
	infos: [
		{ text: 'Hello', value: 'valor' },
		{ text: 'Hello', value: 'valor' }
	]
}
