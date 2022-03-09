import FormCurrency from './FormCurrency.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Forms/FormCurrency',
  component: FormCurrency,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { FormCurrency },
  setup() {
    const model = ref()

    return { args, model }
  },
  template: `
    <div>
      <FormCurrency v-bind="args" />
      <pre>{{ model }}</pre>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  placeholder: "Placeholder",
  label: 'Label'
}
