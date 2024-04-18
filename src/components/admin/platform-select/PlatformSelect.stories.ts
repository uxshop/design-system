import type { Meta, StoryObj } from '@storybook/vue3'
import PlatformSelect from './PlatformSelect.vue'
import type { IPlatform } from './PlatformSelectTypes'

const platforms: IPlatform[] = [
	{
		name: 'Loja virtual',
		url: 'https://loja-virtual.bagy.com.br',
		icon: 'storefront',
		key: 'storefront',
		active: true
	},
	{
		name: 'Marketplace',
		url: 'https://loja-virtual.bagy.com.br',
		icon: 'hub',
		key: 'marketplace',
		active: true,
		badgeStatus: 'beta'
	},
	{
		name: 'Markenting',
		url: 'https://loja-virtual.bagy.com.br',
		icon: 'campaign',
		key: 'marketing',
		active: true,
		badgeStatus: 'comingSoon'
	}
]

const meta = {
	title: 'Admin/PlatformSelect',
	component: PlatformSelect,
	tags: ['autodocs'],
	args: {
		platformsList: platforms,
		badgeConfig: {
			beta: { label: 'Beta alterado', variant: 'highlight' }
		}
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
