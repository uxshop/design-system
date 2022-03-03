import IconButton from './IconButton.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/IconButton',
  component: IconButton,
  args: {
    type: 'outlined',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'light',
        'success',
        'danger',
      ]
    }
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { IconButton },
  setup() {
    return { args }
  },
  template: `
    <IconButton v-bind="args" /> 
  `,
})

export const Default = Template.bind({})
Default.args = {
  icon: 'house',
  size: 50,
}
