import RatingStar from './RatingStar.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/RatingStar',
	component: RatingStar,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { RatingStar },
	setup() {
		const model = ref(2)
		return { args, model }
	},
	template: `
    <RatingStar v-bind="args" v-model="model">
      meu ratingStar 
    </RatingStar>
  `
})

export const Default = Template.bind({})
Default.args = {}
