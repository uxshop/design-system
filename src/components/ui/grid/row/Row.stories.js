import Row from './Row.vue'
import Col from '../col/Col.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Grid/Row',
	component: Row,
	argTypes: {
		alignV: {
			control: { type: 'select' },
			options: ['default', 'center', 'top', 'bottom']
		}
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Row, Col },
	setup() {
		return { args }
	},
	template: `
    <Row v-bind="args">
      <Col style="border: solid 1px">#default</Col>
      <Col style="border: solid 1px">
        #default
        <br>#default
        <br>#default
      </Col>
    </Row>
  `
})

export const Default = Template.bind({})
Default.args = {}
