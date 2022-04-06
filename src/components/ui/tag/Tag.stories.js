import Tag from './Tag.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Tag',
	component: Tag,
	argTypes: {},
	args: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Tag },
	setup() {
		return { args }
	},
	template: `
    <Tag v-bind="args">
			Hello World
		</Tag> 
  `
})

export const Default = Template.bind({})
Default.args = {}
