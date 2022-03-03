import UiAside from './Aside.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Aside',
  component: UiAside,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiAside },
  setup() {
    const aside = ref(true)
    return {
      aside,
      args
    }
  },
  template: `
    <ui-aside v-bind="args" v-model="aside">
      #default slot
    </ui-aside>
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Hello!!'
}
