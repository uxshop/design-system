import Icon from './Icon.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Icon',
	component: Icon,
	args: {
		type: 'outlined'
	},
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['solid', 'round', 'outlined', 'twotone']
		}
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Icon },
	setup() {
		return { args }
	},
	template: `
    <icon v-bind="args" /> 
  `
})

export const Outlined = Template.bind({})
Outlined.args = {
	name: 'house',
	size: 50,
	type: 'outlined'
}
export const Solid = Template.bind({})
Solid.args = {
	name: 'house',
	size: 50,
	type: 'solid'
}
export const round = Template.bind({})
round.args = {
	name: 'house',
	size: 50,
	type: 'round'
}
export const Twotone = Template.bind({})
Twotone.args = {
	name: 'house',
	size: 50,
	type: 'twotone'
}
