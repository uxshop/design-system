import CardAnnotation from './CardAnnotation.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/CardAnnotation',
	component: CardAnnotation,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { CardAnnotation },
	setup() {
		return { args }
	},
	template: `
    <CardAnnotation v-bind="args">
      #LorenIpsum
      <template v-slot:link="item">
       #slotLink
      </template>
    </CardAnnotation>
  `
})

export const Default = Template.bind({})
Default.args = {
	title: 'Título'
}
