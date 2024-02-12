import PageHelperVideo from './PageHelperVideo.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Page helpers are used on top of the pages to help users understand about features page. When clicked, an aside opens with helpful links and a tutorial video. */
const meta: Meta<typeof PageHelperVideo> = {
	title: 'Components/PageHelperVideo',
	component: PageHelperVideo,
	args: {
		video: {
			name: 'Seo & Rastreamento',
			video_id: '_QzHQ3zxUS4',
			articles: [
				{
					name: 'Como cadastrar categorias',
					url: 'https://dooca.desk360.com.br/ajuda/article/como-cadastrar-categorias '
				},
				{
					name: 'Diferença entre Menus e Categorias',
					url: 'https://dooca.desk360.com.br/ajuda/article/diferenca-entre-menus-e-categorias'
				}
			]
		}
	}
}

export default meta
type Story = StoryObj<typeof PageHelperVideo>
export const Default: Story = {
	render: (args) => ({
		components: { PageHelperVideo },
		setup() {
			return { args }
		},
		template: `
      <PageHelperVideo v-bind="args"></PageHelperVideo>
    `
	})
}
