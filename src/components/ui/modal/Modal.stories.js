import UiModal from './Modal.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Modal',
  component: UiModal,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiModal },
  setup() {
    const modal = ref(true)
    return { args, modal }
  },
  template: `
    <button @click="modal = true">
      open modal
    </button> 
    <ui-modal v-bind="args" v-model="modal">
      #default slot
    </ui-modal>
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Hello'
}
