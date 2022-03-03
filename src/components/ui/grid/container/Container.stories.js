import UiContainer from './Container.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Container',
  component: UiContainer,
  argTypes: {
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiContainer },
  setup() {
    return { args }
  },
  template: `
    <ui-container />
  `,
})

export const Default = Template.bind({})
Default.args = {
}
