import PageHelperArticles from './PageHelperArticles.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/PageHelperArticles',
	component: PageHelperArticles,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { PageHelperArticles },
	setup() {
		return { args }
	},
	template: `
    <PageHelperArticles v-bind="args"></PageHelperArticles>
  `
})

export const Default = Template.bind({})
Default.args = {
	title: 'Seo & Rastreamento',
	articles: [
		{
			name: 'Google Analytics',
			url: 'https://ajuda.bagy.com.br/base-de-conhecimento-bagy/marketing/seo-e-rastreamento/google-analytics'
		},
		{
			name: 'Google Search Console',
			url: 'https://ajuda.bagy.com.br/base-de-conhecimento-bagy/marketing/seo-e-rastreamento/google-search-console'
		}
	]
}
