import type { Meta, StoryObj } from '@storybook/vue3'
import UserProfileCard from './UserProfileCard.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
	title: 'Admin/UseProfileCard',
	component: UserProfileCard,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		user: {
			name: 'Leandro Wagner'
		},
		caption: 'locaweb',
		label: 'minha conta',
		dropdown: [{ text: 'My Store', icon: 'local_mall' }, { type: 'divider' }, { text: 'User', to: { users: 'users' } }]
	}
} satisfies Meta<typeof UserProfileCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const Image: Story = {
	args: {
		user: {
			name: 'Leandro Wagner',
			image: {
				src: 'https://picsum.photos/200'
			}
		},
		caption: 'locaweb',
		label: 'minha conta',
		dropdown: [{ text: 'My Store', icon: 'local_mall' }, { type: 'divider' }, { text: 'User', to: "{ name: 'users' }" }]
	}
}
