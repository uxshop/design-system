import UiFormValidation from './FormValidation.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/FormValidation',
  component: UiFormValidation,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiFormValidation },
  setup() {
    const model = ref({
      doc: ['Email inválido', 'Email inválido']
    })
    return { args, model }
  },
  template: `
    <ui-form-validation v-bind="args" v-model="model">
      meu form validation 
    </ui-form-validation>
  `,
})

export const Default = Template.bind({})
Default.args = {
}
