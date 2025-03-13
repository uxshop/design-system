import type { Meta, StoryObj } from '@storybook/vue3';
import { completeEventsForm } from '../form-wrapper/__mocks__/completeEventsForm';
import FormTextfield from './FormTextfield.vue';
import { completeEventsTextField } from './__mocks__/completeEventsTextField';

const templateFormTextfield = /* html */ `
  <FormTextfield v-bind="args" v-model="args.modelValue" ></FormTextfield>
`;

/** A text input field is a space where users can type and enter short pieces of information, such as names, addresses, or other brief text. */
const meta: Meta<typeof FormTextfield> = {
  title: 'Ui/Form/FormTextfield',
  component: FormTextfield,
  tags: ['autodocs'],
  args: {
    ...completeEventsForm,
    ...completeEventsTextField,
    state: undefined,
    label: 'Label',
    float: false,
    disabled: false,
    size: 'md',
    placeholder: 'Digite um texto',
  },
  render: (args) => ({
    components: { FormTextfield },
    setup() {
      return { args };
    },
    template: templateFormTextfield,
  }),
  argTypes: {
    state: {
      control: 'radio',
      options: [true, false, 'undefined'],
      description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral',
    },
    invalidFeedback: {
      control: 'text',
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
    modelValue: 'Input value',
    float: true,
  },
};

export const loading: Story = {
  args: {
    modelValue: 'Input value',
    loading: true,
  },
};

export const disabled: Story = {
  args: {
    modelValue: 'Input value',
    disabled: true,
  },
};

export const leadingIcon: Story = {
  args: {
    modelValue: 'Input value',
    leadingIcon: 'search',
  },
};

export const trailingIcon: Story = {
  args: {
    modelValue: 'Input value',
    trailingIcon: 'search',
  },
};

export const labelInfo: Story = {
  args: {
    modelValue: 'Input value',
    labelInfo: 'Label Info',
  },
};

export const invalidFeedback: Story = {
  args: {
    modelValue: 'Input value',
    label: 'My Label',
    state: false,
    invalidFeedback: 'Campo inválido',
  },
};

export const mask: Story = {
  args: {
    modelValue: '19999999999',
    mask: ['(##) ####-####', '(##) #####-####'],
  },
};

export const clearable: Story = {
  args: {
    clearable: true,
    modelValue: 'Clearable',
  },
};

export const maxlengthWithCounter: Story = {
  args: {
    modelValue: '',
    label: 'Descrição',
    maxlength: 10,
    showCounter: true,
  },
};

export const maxlengthWithCounterMaximumNotExceeded: Story = {
  args: {
    label: 'Descrição',
    modelValue: '1234567890',
    maxlength: 10,
    allowExceedMaxLength: false,
    showCounter: true,
  },
};

export const maxlengthWithCounterMaximumExceeded: Story = {
  args: {
    label: 'Descrição',
    modelValue: '1234567890123',
    maxlength: 10,
    allowExceedMaxLength: true,
    showCounter: true,
  },
};
