import SelectItemCard from './SelectItemCard.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof SelectItemCard> = {
	title: 'Ui/SelectItemCard',
	component: SelectItemCard,
	args: {
		name: 'Item A',
		description: 'descrição do item A',
		icon: 'storefront'
	}
}

export default meta
type Story = StoryObj<typeof SelectItemCard>

export const Default: Story = {}
