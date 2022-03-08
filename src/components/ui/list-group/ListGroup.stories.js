import ListGroup from './ListGroup.vue'
import ListGroupItem from './ListGroupItem.vue'
import ListGroupItemButton from './ListGroupItemButton.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/ListGroup',
	component: ListGroup,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { ListGroup, ListGroupItem, ListGroupItemButton },
	setup() {
		return { args }
	},
	template: `
    <list-group v-bind="args">
      <list-group-item> 
        #LIST_GROUP_ITEM
      </list-group-item>
      <list-group-item-button> 
        #LIST_GROUP_ITEM_BUTTON
      </list-group-item>
    </list-group>
  `
})

export const Default = Template.bind({})
Default.args = {}
