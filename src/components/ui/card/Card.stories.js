import UiCard from './Card.vue';
import UiCardTitle from './CardTitle.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Card',
  component: UiCard,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiCard },
  setup() {
    return { args };
  },
  template: `
  <ui-card v-bind="args">
    Conteudo do card
  </ui-card>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Card normal',
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  title: 'Card dropdown',
  dropdownClosed: true,
};

const Template2 = (args) => ({
  components: { UiCard, UiCardTitle },
  setup() {
    return { args };
  },
  template: `
    <ui-card v-bind="args">
      <template #header-title>
        <ui-card-title>#header-title</ui-card-title>
      </template>
      <template #caption>
        #caption
      </template>
      <template #header-button>
        #header-button
      </template>
      <template #footer>
        #footer
      </template>
      #default
    </ui-card>
  `,
});

export const Slots = Template2.bind({});
Slots.args = {
  title: 'Card dropdown',
};
