import UiDivider from './Divider.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Divider',
  component: UiDivider,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiDivider },
  setup() {
    return { args }
  },
  template: `
    <ui-divider v-bind="args">
      meu divider 
    </ui-divider>
  `,
})

export const Default = Template.bind({})
Default.args = {
}
