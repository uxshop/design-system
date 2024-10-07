import PageHelper from './PageHelper.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/** Page helpers are used on top of the pages to help users understand about features page. When clicked, the user is redirected to the link, which opens in a aside. */
const meta: Meta<typeof PageHelper> = {
  title: 'Components/PageHelper',
  component: PageHelper,
  args: {
    helperName: 'Produtos',
    helperLink: 'https://ajuda.bagy.com.br/base-de-conhecimento-bagy/produtos',
  },
};

export default meta;
type Story = StoryObj<typeof PageHelper>;

export const Default: Story = {
  render: (args) => ({
    components: { PageHelper },
    setup() {
      return { args };
    },
    template: `
    <PageHelper v-bind="args">
      Saiba mais sobre
			<a :href="this.$route.meta.support" style="text-transform: lowercase">
				produtos
			</a>
			na base de conhecimento.
    </PageHelper>
  `,
  }),
};
