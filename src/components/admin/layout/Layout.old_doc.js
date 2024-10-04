import Layout from './Layout.vue';
import vueRouter from 'storybook-vue3-router';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Layout',
  component: Layout,
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { Layout },
  setup() {
    return { args };
  },
  template: `
    <Layout v-bind="args">
      <template #sidebar>
        #sidebar slot
      </template>
      <template #navbar>
        #navbar slot
      </template>
    </Layout>
  `,
});

export const Default = Template.bind({});
Default.args = {};

Default.decorators = [vueRouter()];
