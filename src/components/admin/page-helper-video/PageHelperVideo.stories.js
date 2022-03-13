import PageHelperVideo from './PageHelperVideo.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/PageHelperVideo',
	component: PageHelperVideo,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { PageHelperVideo },
	setup() {
		return { args }
	},
	template: `
    <PageHelperVideo v-bind="args"></PageHelperVideo>
  `
})

export const Default = Template.bind({})
Default.args = {
	video: {
		video_id: '_QzHQ3zxUS4',
		articles: [
			{
				title: 'Como cadastrar categorias',
				url: 'https://dooca.desk360.com.br/ajuda/article/como-cadastrar-categorias '
			},
			{
				title: 'Diferença entre Menus e Categorias',
				url: 'https://dooca.desk360.com.br/ajuda/article/diferenca-entre-menus-e-categorias'
			}
		]
	}
}
