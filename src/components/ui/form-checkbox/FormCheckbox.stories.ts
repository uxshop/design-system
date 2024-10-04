import FormCheckbox from './FormCheckbox.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/** Checkboxes are used when there are multiple items to select in a list or when users need to show they agree to specific terms or services. */
const meta: Meta<typeof FormCheckbox> = {
  title: 'Ui/Form/FormCheckbox',
  component: FormCheckbox,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    disabled: false,
    switch: false,
    indeterminate: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Switch: Story = {
  args: {
    switch: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
