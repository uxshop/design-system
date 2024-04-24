import { ref } from 'vue'
import FormColorpicker from './FormColorpicker.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** The color picker is used to set and select a color. */
const meta: Meta<typeof FormColorpicker> = {
  title: 'Ui/Form/FormColorpicker',
  component: FormColorpicker,
  tags: ['autodocs'],
  args: {
    label: 'label',
    placeholder: 'placeholder',
  },
  render: (args) => ({
    components: { FormColorpicker },
    setup() {
      const model = ref()
      const updateModel = (event) => model.value = event
      return { args, model, updateModel }
    },
    template: `
      <FormColorpicker v-bind="args" :modelValue="model" @update="updateModel"/>
    `,
  }),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithInput: Story = {
  args: {
    withInput: true
  }
}
