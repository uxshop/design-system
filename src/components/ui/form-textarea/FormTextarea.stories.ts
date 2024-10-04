import FormTextarea from './FormTextarea.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/** A text area input allows users to write and edit multiple lines of text, making it suitable for entering longer messages or detailed information. */
const meta: Meta<typeof FormTextarea> = {
  title: 'Ui/Form/FormTextarea',
  component: FormTextarea,
  tags: ['autodocs'],
  args: {
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

export const Default: Story = {};

export const Float: Story = {
  args: {
    float: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LeadingIcon: Story = {
  args: {
    leadingIcon: 'check',
  },
};

export const TrailingIcon: Story = {
  args: {
    trailingIcon: 'check',
  },
};

export const LabelInfo: Story = {
  args: {
    labelInfo: 'Label Info',
  },
};

export const InvalidFeedback: Story = {
  args: {
    label: 'My Label',
    state: false,
    invalidFeedback: 'Campo inválido',
  },
};
