import type { Meta, StoryObj } from '@storybook/vue3'
import QuickSearch from './QuickSearch.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
	title: 'Admin/QuickSearch',
	component: QuickSearch,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		isOpen: false,
		searchOptions: [
			{ value: 'product', label: 'Produtos' },
			{ value: 'order', label: 'Pedidos' }
		],
		caption: 'Encontre os produtos e pedidos da sua loja virtual.'
	}
} satisfies Meta<typeof QuickSearch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: meta.args
}
