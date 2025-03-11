import type { Meta, StoryObj } from '@storybook/vue3';
import { completeEventsForm } from '../form-wrapper/__mocks__/completeEventsForm';
import FormTextarea from './FormTextarea.vue';
import { completeEventsTextArea } from './__mocks__/completeEventsTextArea';

/**
 * Um campo de texto permite que os usuários escrevam e editem várias linhas de texto, tornando-o adequado para inserir mensagens mais longas ou informações detalhadas.
 */
const meta: Meta<typeof FormTextarea> = {
  title: 'Ui/Form/FormTextarea',
  component: FormTextarea,
  tags: ['autodocs'],
  args: {
    ...completeEventsForm,
    ...completeEventsTextArea,
    state: undefined,
    invalidFeedback: '',
    label: 'Label',
    placeholder: ' placeholder',
    float: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    invalidFeedback: {
      control: 'text',
    },
    state: {
      control: 'radio',
      options: [true, false, 'undefined'],
      description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral',
    },
    rows: {
      control: 'number',
      defaultValue: 4,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const minimum: Story = {};

export const float: Story = {
  args: {
    float: true,
  },
};

export const loading: Story = {
  args: {
    loading: true,
  },
};

export const disabled: Story = {
  args: {
    disabled: true,
  },
};

export const leadingIcon: Story = {
  args: {
    leadingIcon: 'check',
  },
};

export const trailingIcon: Story = {
  args: {
    trailingIcon: 'check',
  },
};

export const labelInfo: Story = {
  args: {
    labelInfo: 'Label Info',
  },
};

export const invalidFeedback: Story = {
  args: {
    label: 'My Label',
    state: false,
    invalidFeedback: 'Campo inválido',
  },
};

export const helpFeedback: Story = {
  args: {
    modelValue: '',
    label: 'Descrição',
    helpFeedback: 'Não use caracteres especiais',
  },
};

export const maxlengthWithCounter: Story = {
  args: {
    modelValue: '',
    label: 'Descrição',
    maxlength: 10,
  },
};

export const maxlengthWithCounterMaximumNotExceeded: Story = {
  args: {
    label: 'Descrição',
    modelValue: '1234567890',
    maxlength: 10,
    allowExceedMaxLength: false,
  },
};

export const maxlengthWithCounterMaximumExceeded: Story = {
  args: {
    label: 'Descrição',
    modelValue: '1234567890123',
    maxlength: 10,
    allowExceedMaxLength: true,
  },
};
