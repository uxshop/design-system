import UiFormRadio from './FormRadio.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Forms/FormRadio',
  component: UiFormRadio,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiFormRadio },
  setup() {
    return { args }
  },
  template: `
    <ui-form-radio v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Radio',
  value: '2'
}
