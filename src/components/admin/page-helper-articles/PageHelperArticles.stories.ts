import PageHelperArticles from './PageHelperArticles.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof PageHelperArticles> = {
  title: 'Components/PageHelperArticles',
  component: PageHelperArticles,
  args: {
    title: 'Seo & Rastreamento',
    articles: [
      {
        name: 'Google Analytics',
        url: 'https://ajuda.bagy.com.br/base-de-conhecimento-bagy/marketing/seo-e-rastreamento/google-analytics',
      },
      {
        name: 'Google Search Console',
        url: 'https://ajuda.bagy.com.br/base-de-conhecimento-bagy/marketing/seo-e-rastreamento/google-search-console',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof PageHelperArticles>;
export const Default: Story = {
  render: (args) => ({
    components: { PageHelperArticles },
    setup() {
      return { args };
    },
    template: `
      <PageHelperArticles v-bind="args"></PageHelperArticles>
    `,
  }),
};
