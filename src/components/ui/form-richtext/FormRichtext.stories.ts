import FormRichtext from './FormRichtext.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Rich text is a text area that offers text alignment, image upload, text links, and an HTML editor. It is typically used for create custom descriptions. */
const meta: Meta<typeof FormRichtext> = {
	title: 'Ui/Form/FormRichtext',
	component: FormRichtext,
	tags: ['autodocs'],
	args: {
		label: 'Label',
		placeholder: 'Placeholder'
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
