import Aside from './Aside.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Aside',
	component: Aside,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Aside },
	setup() {
		const aside = ref(true)
		return {
			aside,
			args
		}
	},
	template: `
    <Aside v-bind="args" v-model="aside">
      #default slot
    </Aside>
  `
})

export const Default = Template.bind({})
Default.args = {
	title: 'Hello!!'
}
