import UiTabs from './Tab.vue'
import UiTabItem from './TabItem.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Tab',
  component: UiTabs,
  argTypes: {},
  args: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiTabs, UiTabItem },
  setup() {
    const model = ref(2)
    return { args, model }
  },
  template: `
    <ui-tabs v-bind="args" v-model="model">
      <ui-tab-item>Tab 1</ui-tab-item>
      <ui-tab-item>Tab 2</ui-tab-item>
      <ui-tab-item>Tab 3</ui-tab-item>
      <ui-tab-item>Tab 4</ui-tab-item>
      <ui-tab-item>Tab 5</ui-tab-item>
      <ui-tab-item>Tab 6</ui-tab-item>
      <ui-tab-item>Tab 7</ui-tab-item>
    </ui-tabs>
  `,

  // :icon="index == '_BLOCKS_' ? 'pivot_table_chart' : null"
  // type="textWithIcon"
})

export const Default = Template.bind({})
Default.args = {
}
