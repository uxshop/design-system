import PaginationItem from './PaginationItem.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import Pagination from './UiPagination.vue'

const meta = {
	title: 'Ui/Pagination',
	component: Pagination,
	tags: ['autodocs'],
	args: {}
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	render: () => ({
		components: { Pagination, PaginationItem },
		template: `
    <Pagination>
      <PaginationItem>Pagination item</PaginationItem>
      <PaginationItem>Pagination item</PaginationItem>
      <PaginationItem disabled>Pagination item</PaginationItem>
    </Pagination>`
	})
}
