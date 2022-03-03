import UiRow from './Row.vue'
import UiCol from '../col/Col.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Grid/Row',
  component: UiRow,
  argTypes: {
    alignV: {
      control: { type: 'select' },
      options: [
        'default',
        'center',
        'top',
        'bottom',

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
    <ui-row v-bind="args">
      <ui-col style="border: solid 1px">#default</ui-col>
      <ui-col style="border: solid 1px">
        #default
        <br>#default
        <br>#default
      </ui-col>
    </ui-row>
  `,
})

export const Default = Template.bind({})
Default.args = {
}
