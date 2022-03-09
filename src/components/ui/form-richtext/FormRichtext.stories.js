import UiFormRichtext from './FormRichtext.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Forms/FormRichtext',
  component: UiFormRichtext,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiFormRichtext },
  setup() {
    const model = ref()
    setTimeout(() => {
      model.value = '<h6>Olá mundo</h6>'
    }, 1000)
    return { args, model }
  },
  template: `
    <div>
      <ui-form-richtext v-bind="args" v-model="model" />
      <pre>{{ model }}</pre>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Richtext'
}

export const CustomToolbar = Template.bind({})
CustomToolbar.args = {
  toolbar: ['link', 'bold', 'italic', 'underline', 'strike']
}
