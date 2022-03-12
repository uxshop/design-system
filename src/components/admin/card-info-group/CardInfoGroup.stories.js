import CardInfoGroup from './CardInfoGroup.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/CardInfoGroup',
	component: CardInfoGroup,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { CardInfoGroup },
	setup() {
		return { args }
	},
	template: `
    <CardInfoGroup v-bind="args">
      Loren ipsum
    </CardInfoGroup>
  `
})

export const Default = Template.bind({})
Default.args = {
	infos: [
		{ text: 'Hello', value: 'valor' },
		{ text: 'Hello', value: 'valor' }
	]
}
