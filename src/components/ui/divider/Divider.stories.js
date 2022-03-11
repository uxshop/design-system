import Divider from './Divider.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Divider',
  component: Divider,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { Divider },
  setup() {
    return { args }
  },
  template: `
    <Divider v-bind="args">
      meu divider 
    </Divider>
  `,
})

export const Default = Template.bind({})
Default.args = {
}
