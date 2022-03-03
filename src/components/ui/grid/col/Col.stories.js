import UiRow from '../row/Row.vue'
import UiCol from './Col.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Grid/Col',
  component: UiCol,
  argTypes: {
    sm: {
      control: { type: 'select' },
      options: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
      ],
    },
    offset: {
      control: { type: 'select' },
      options: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
      ],
    },
    offsetSm: {
      control: { type: 'select' },
      options: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
      ],
    },
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiRow, UiCol },
  setup() {
    return { args }
  },
  template: `
    <UiRow>
      <UiCol v-bind="args" style="border: solid 1px; padding-top: 10px; padding-bottom: 10px">#default</UiCol>
      <UiCol style="border: solid 1px; padding-top: 10px; padding-bottom: 10px">#default w / args</UiCol>
    </UiRow>
  `,
})

export const Auto = Template.bind({})
Auto.args = {
  cols: 'auto'
}

export const Mobile = Template.bind({})
Mobile.args = {
  sm: 6
}

export const Offset = Template.bind({})
Offset.args = {
  offset: 6
}
