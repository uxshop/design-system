import type { Meta, StoryObj } from '@storybook/vue3'
import PlatformSelect from './PlatformSelect.vue'
import type { IPlatform } from './PlatformSelectTypes'

const platforms: IPlatform[] = [
	{
		name: 'Loja virtual',
		description: 'Adicione seus produtos, customize sua loja e veja seus pedidos.',
		url: 'https://loja-virtual.bagy.com.br',
		icon: 'storefront',
		key: 'storefront',
		active: true
	},
	{
		name: 'Marketplace',
		description: 'Configure campanhas do Google, Facebook e Tiktok.',
		url: 'https://loja-virtual.bagy.com.br',
		icon: 'hub',
		key: 'marketplace',
		active: true
	}
]

const meta = {
	title: 'Admin/PlatformSelect',
	component: PlatformSelect,
	tags: ['autodocs'],
	args: {
		platformsList: platforms
	}
} satisfies Meta<typeof PlatformSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: { PlatformSelect },
		setup() {
			return { args }
		},
		template: `
    <div style="max-width:350px">
      <PlatformSelect v-bind="args"  >
        <template #logo-icon>
            <img width="100%" src="./logo.svg"/>
        </template>
      </PlatformSelect>
    </div>
    `
	})
}
