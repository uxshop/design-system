import Container from './Container.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Grid/Container',
	component: Container,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Container },
	setup() {
		return { args }
	},
	template: `
    <Container />
  `
})

export const Default = Template.bind({})
Default.args = {}
