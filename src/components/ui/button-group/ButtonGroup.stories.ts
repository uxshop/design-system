import Button from '../button/Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** The button group is employed for adding and removing items. It is utilized in categories or menu trees. */
const meta: Meta<typeof ButtonGroup> = {
	title: 'Ui/Button/ButtonGroup',
	component: ButtonGroup,
	tags: ['autodocs'],
	render: () => ({
		components: { Button, ButtonGroup },
		template: `
    <ButtonGroup>
      <Button label="Button 1" />
      <Button label="Button 2" />
      <Button label="Button 3" />
    </ButtonGroup>
  `
	})
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
