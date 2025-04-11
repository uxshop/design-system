import type { Meta, StoryObj } from '@storybook/vue3';
import { completeEventsForm } from '../form-wrapper/__mocks__/completeEventsForm';
import FormCurrency from './FormCurrency.vue';

/**
 * Um campo de moeda é um campo de entrada aprimorado que permite que os usuários insiram apenas um
 * valor monetário.
 */
const meta: Meta<typeof FormCurrency> = {
  title: 'Ui/Form/FormCurrency',
  component: FormCurrency,
  tags: ['autodocs'],
  args: {
    ...completeEventsForm,
    state: undefined,
    invalidFeedback: '',
    float: false,
    loading: false,
    disabled: false,
    size: 'md',
    label: 'Label',
    min: 1,
    max: 100,
  },
  argTypes: {
    modelValue: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    invalidFeedback: {
      control: 'text',
    },
    state: {
      control: 'radio',
      options: [true, false, 'undefined'],
      description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral',
    },
    step: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
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
    leadingIcon: 'paid',
  },
};

export const trailingIcon: Story = {
  args: {
    trailingIcon: 'paid',
  },
};

export const labelInfo: Story = {
  args: {
    labelInfo: 'Label Info',
  },
};

export const invalidFeedback: Story = {
  args: {
    state: false,
    invalidFeedback: 'Campo inválido',
  },
};

export const helpFeedback: Story = {
  args: {
    state: undefined,
    helpFeedback: 'Recomendado: R$ 25,00',
  },
};

export const minAndMax: Story = {
  args: {
    min: 10,
    max: 100,
  },
};
