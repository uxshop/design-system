import UiRatingStar from './RatingStar.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/RatingStar',
  component: UiRatingStar,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiRatingStar },
  setup() {
    const model = ref(2)
    return { args, model }
  },
  template: `
    <ui-rating-star v-bind="args" v-model="model">
      meu rating-star 
    </ui-rating-star>
  `,
})

export const Default = Template.bind({})
Default.args = {}
