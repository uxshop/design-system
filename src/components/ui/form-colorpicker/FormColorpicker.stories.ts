import FormColorpicker from './FormColorpicker.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/** The color picker is used to set and select a color. */
const meta: Meta<typeof FormColorpicker> = {
  title: 'Ui/Form/FormColorpicker',
  component: FormColorpicker,
  tags: ['autodocs'],
  args: {
    label: 'label',
    placeholder: 'placeholder',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithInput: Story = {
  args: {
    withInput: true,
  },
};
