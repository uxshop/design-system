import UiDialog from './Dialog.vue'
import UiDialogService from './index'
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Dialog',
  component: UiDialog,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiDialog },
  setup() {
    return { args }
  },
  template: `
    <ui-dialog v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Hello World',
  message: 'Hello World',
  // type: 'prompt',
}

const TemplateService = (args) => ({
  components: {},
  setup() {
    const onClick = () => {
      UiDialogService.open({
        title: 'By Service',
        message: 'Hello Service!!!',
        type: args.type,
        callback: (val) => {
          console.log('Click Destruct Label => Val:', val)
        }
      })
    }
    return { args, onClick }
  },
  template: `
    <button @click="onClick">
      open as service
    </button>
  `,
})

export const Service = TemplateService.bind({})
Service.args = {
  message: 'Hello World',
  variant: 'success',
}

export const Prompt = TemplateService.bind({})
Prompt.args = {
  message: 'Hello World',
  variant: 'success',
  type: 'prompt'
}
