import FormValidation from './FormValidation.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Form validation provides feedback messages when errors occur in a form. */
const meta: Meta<typeof FormValidation> = {
	title: 'Ui/Form/FormValidation',
	component: FormValidation,
	tags: ['autodocs'],
	args: {
		modelValue: {
			name: ['Nome obrigatório'],
			address: ['Endereço obrigatório', 'Referência obrigatória']
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithTranslateObj: Story = {
	args: {
		translate: {
			name: 'Nome',
			address: 'Endereço'
		}
	}
}

export const WithManyErrors: Story = {
	args: {
		modelValue: {
			'required.0.name': ['Nome obrigatório'],
			'required.1.passWord': ['Senha obrigatória'],
			'invalid.1.passWord': ['Senha precisa ter 8 ou mais caracteres']
		},
		translate: {
			invalid: {
				invalid: 'Invalido',
				passWord: 'Senha'
			},
			required: {
				required: 'obrigatório',
				passWord: 'Senha',
				name: 'Nome'
			}
		}
	}
}

export const WithoutKey: Story = {
	args: {
		hideKey: true
	}
}

export const NoDismissible: Story = {
	args: {
		noDismissible: true
	}
}
