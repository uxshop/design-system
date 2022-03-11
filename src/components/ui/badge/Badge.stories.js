import Badge from './Badge.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Badge',
	component: Badge,
	args: {
		type: 'md'
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg']
		}
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Badge },
	setup() {
		return { args }
	},
	template: `
    <Badge v-bind="args">
      #dafault slot
    </Badge>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const success = Template.bind({})
success.args = {
	variant: 'success'
}

export const danger = Template.bind({})
danger.args = {
	variant: 'danger'
}

export const secondary = Template.bind({})
secondary.args = {
	variant: 'secondary'
}

export const dark = Template.bind({})
dark.args = {
	variant: 'dark'
}
