import DescriptionListItem from './components/description-list-item/DescriptionListItem.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import DescriptionList from './DescriptionList.vue'

const meta = {
	title: 'Ui/Description List',
	component: DescriptionList,
	tags: ['autodocs'],
	args: {}
} satisfies Meta<typeof DescriptionList>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	render: () => ({
		components: { DescriptionList, DescriptionListItem },
		template: `
    <DescriptionList>
      <DescriptionListItem label="Description List item label">
        Description List item description
      </DescriptionListItem>
      <DescriptionListItem label="Description List item label">
        Description List item description
      </DescriptionListItem>
      <DescriptionListItem label="Description List item label">
        Description List item description
      </DescriptionListItem>
    </DescriptionList>
    `
	})
}
