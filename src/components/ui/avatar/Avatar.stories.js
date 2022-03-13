import Avatar from './Avatar.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Avatar',
	component: Avatar,
	argTypes: {},
	args: {
		text: 'MB'
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Avatar },
	setup() {
		return { args }
	},
	template: `
    <Avatar size="20" v-bind="args" /> 
  `
})

export const Default = Template.bind({})
Default.args = {
	size: 60
}
