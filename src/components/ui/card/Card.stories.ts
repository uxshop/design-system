import Card from './Card.vue'
import CardTitle from './CardTitle.vue'
import CardItem from './CardItem.vue'
import CardSection from './CardSection.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Cards are used to group similar content and tasks. They help you read and do things. */
const meta: Meta<typeof Card> = {
	title: 'Ui/Card',
	component: Card,
	tags: ['autodocs'],
	args: {
		title: 'Title',
		caption: 'Caption',
		plain: false,
		gray: false
	},
	render: (args) => ({
		components: { Card, CardItem },
		setup() {
			return { args }
		},
		template: `
    <Card v-bind="args">
      <CardItem> Card item content </CardItem>
    </Card>`
	})
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
	args: {
		loading: true
	}
}

export const WithTitleMuted: Story = {
	args: {
		titleMuted: '(Title Muted)'
	}
}

export const WithTitleComponent: Story = {
	render: (args) => ({
		components: { Card, CardItem, CardSection, CardTitle },
		setup() {
			return { args }
		},
		template: `
    <Card v-bind="args">
      <CardTitle> Card title </CardTitle>
    </Card>`
	})
}

export const WithSection: Story = {
	render: (args) => ({
		components: { Card, CardItem, CardSection, CardTitle },
		setup() {
			return { args }
		},
		template: `
    <Card v-bind="args">
      <CardSection>
      Fist section
      </CardSection>
      <CardSection>
      Second section
      </CardSection>
    </Card>`
	})
}

export const WithFooter: Story = {
	render: (args) => ({
		components: { Card, CardItem, CardSection, CardTitle },
		setup() {
			return { args }
		},
		template: `
    <Card v-bind="args">
    <p> Card item content </p>
      <template #footer>
      <p> Card footer </p>
      </template>
    </Card>`
	})
}

export const Dropdown: Story = {
	args: {
		dropdown: true
	}
}

export const DropdownWithLabel: Story = {
	args: {
		dropdown: true,
		dropdownLabel: 'dropdownLabel',
		dropdownClosed: true
	}
}

export const DropdownCloseCaption: Story = {
	args: {
		dropdown: true,
		dropdownClosed: true,
		closeCaption: 'Close caption',
		caption: undefined
	}
}

export const WithActionButtons: Story = {
	args: {
		actions: [
			{
				label: 'Action button'
			}
		]
	}
}
