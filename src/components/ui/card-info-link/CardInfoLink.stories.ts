import type { Meta, StoryObj } from '@storybook/vue3'
import CardInfoLink from './CardInfoLink.vue'

/** CardInfoLink are used as link to another page internal or external, frequently used in fast access in home  */
const meta: Meta<typeof CardInfoLink> = {
	title: 'Ui/CardInfoLink',
	component: CardInfoLink,
	tags: ['autodocs'],
	args: { title: 'Visitar <br>minha loja', iconName: 'storefront', href: 'www.minhaloja.bagypro.com.br' },
	render: (args) => ({
		components: { CardInfoLink },
		setup() {
			return { args }
		},
		template: `
    <CardInfoLink v-bind="args">

    </CardInfoLink>`
	})
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
