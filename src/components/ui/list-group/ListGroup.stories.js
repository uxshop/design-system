import ListGroup from './ListGroup.vue'
import ListGroupItem from './ListGroupItem.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'ListGroup',
	component: ListGroup,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { ListGroup, ListGroupItem },
	setup() {
		return { args }
	},
	template: `
    <ui-list-group v-bind="args">
      <ui-list-group-item> 
        Teste
      </ui-list-group-item>
      <ui-list-group-item button> 
        Teste
      </ui-list-group-item>
    </ui-list-group>
  `
})

export const Default = Template.bind({})
Default.args = {}
