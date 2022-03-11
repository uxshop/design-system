import UiCardAnnotation from './CardAnnotation.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/CardAnnotation',
  component: UiCardAnnotation,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiCardAnnotation },
  setup() {
    return { args }
  },
  template: `
    <UiCardAnnotation v-bind="args">
      Loren ipsum
    </UiCardAnnotation>
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Título',
}
