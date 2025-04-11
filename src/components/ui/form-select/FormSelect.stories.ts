import type { Meta, StoryObj } from '@storybook/vue3';
import FormSelect from './FormSelect.vue';

/** A select allows users to choose one option from a list of values. */
const meta: Meta<typeof FormSelect> = {
  title: 'Ui/Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  args: {
    state: undefined,
    invalidFeedback: '',
    label: 'Label',
    float: false,
    disabled: false,
    loading: false,
    size: 'md',
    value: '',
    options: [
      {
        label: 'placeholder',
        value: '',
        disabled: true,
      },
      {
        label: 'Option 1',
        value: 1,
      },
      {
        label: 'Option 2',
        value: 2,
      },
    ],
  },
  argTypes: {
    state: {
      control: 'radio',
      options: [true, false, 'undefined'],
      description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
    state: false,
    invalidFeedback: 'Campo inválido',
  },
};

export const helpFeedback: Story = {
  args: {
    state: undefined,
    helpFeedback: 'Itens não existentes no catálogo não serão listados',
  },
};
