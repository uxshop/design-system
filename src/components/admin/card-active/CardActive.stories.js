import CardActive from './CardActive.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/CardActive',
  component: CardActive,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { CardActive },
  setup() {
    return { args }
  },
  template: `
    <CardActive v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  modelValue: true,
  resource: {}
}
