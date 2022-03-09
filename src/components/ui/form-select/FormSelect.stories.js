import UiFormSelect from './FormSelect.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Forms/FormSelect',
  component: UiFormSelect,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiFormSelect },
  setup() {
    const model = ref(null)
    setTimeout(() => {
      // model.value = 2
    }, 1000)
    return { args, model }
  },
  template: `
    <ui-form-select v-bind="args" v-model="model">
      <option :value=3>Teste</option>
    </ui-form-select>

    <button value="" @click="model=null">set null</button>
    <pre>{{ model }}</pre>
  `,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Label',
  placeholder: 'Placeholder'
}
export const float = Template.bind({})
float.args = {
  placeholder: 'Placeholder',
  float: true,
  label: 'Label'
}
export const Options = Template.bind({})
Options.args = {
  placeholder: 'Placeholder',
  // float: true,
  label: 'Label',
  options: [{
    text: 'Valor 1',
    value: 1,
  }, {
    text: 'Valor 2',
    value: 2,
    disabled: true
  }]
}
export const ObjectOptions = Template.bind({})
ObjectOptions.args = {
  placeholder: 'Placeholder',
  label: 'Label',
  options: [{
    text: 'Valor 1',
    value: { name: '01' },
  }, {
    text: 'Valor 2',
    value: { name: '02' },
  }]
}
