import Tabs from './Tab.vue'
import TabItem from './TabItem.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Tab',
	component: Tabs,
	argTypes: {},
	args: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Tabs, TabItem },
	setup() {
		const model = ref(2)
		return { args, model }
	},
	template: `
    <Tabs v-bind="args" v-model="model">
      <TabItem>Tab 1</TabItem>
      <TabItem>Tab 2</TabItem>
      <TabItem>Tab 3</TabItem>
      <TabItem>Tab 4</TabItem>
      <TabItem>Tab 5</TabItem>
      <TabItem>Tab 6</TabItem>
      <TabItem>Tab 7</TabItem>
    </Tabs>
  `

	// :icon="index == '_BLOCKS_' ? 'pivot_table_chart' : null"
	// type="textWithIcon"
})

export const Default = Template.bind({})
Default.args = {}
