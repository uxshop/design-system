import ListGroup from './ListGroup.vue';
import ListGroupItem from './ListGroupItem.vue';
import ListGroupItemButton from './ListGroupItemButton.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/ListGroup',
  component: ListGroup,
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { ListGroup, ListGroupItem, ListGroupItemButton },
  setup() {
    return { args };
  },
  template: `
    <ListGroup v-bind="args">
      <ListGroupItem> 
        #LIST_GROUP_ITEM
      </ListGroupItem>
      <ListGroupItemButton> 
        #LIST_GROUP_ITEM_BUTTON
      </ListGroupItemButton>
    </ListGroup>
  `,
});

export const Default = Template.bind({});
Default.args = {};
