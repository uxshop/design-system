import { ref } from 'vue';
import FormSpinbutton from './FormSpinbutton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/** A spin button lets users type numbers and increase or decrease using icon buttons. */
const meta: Meta<typeof FormSpinbutton> = {
  title: 'Ui/Form/FormSpinbutton',
  component: FormSpinbutton,
  tags: ['autodocs'],
  args: {
    loading: false,
    disabled: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  render: (args) => ({
    components: { FormSpinbutton },
    setup() {
      const modelValue = ref(0);
      return { args, modelValue };
    },
    template: `
        <div>
          <FormSpinbutton v-bind="args" v-model="modelValue" />
        </div>
      `,
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inputable: Story = {
  args: {
    inputable: true,
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
