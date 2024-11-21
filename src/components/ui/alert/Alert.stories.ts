import type { Meta, StoryObj } from '@storybook/vue3';

import Alert from './Alert.vue';

const meta = {
  title: 'Ui/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    show: true,
    title: 'Alert title',
    label: 'My content',
    icon: '',
    center: false,
    dismissible: false,
  },
  argTypes: {
    icon: {
      control: 'radio',
      options: [null, 'warning', 'error', 'check_circle'],
      description:
        'Todos os ícones disponíveis podem ser encontrados em [Material Symbols](https://fonts.google.com/icons).',
    },
    variant: {
      control: 'radio',
      options: ['info', 'default', 'success', 'warning', 'danger', 'highlight'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Para visualizar as cores do componente reflitadas para cada organização, alterne a organização selecionada no topo.',
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const minimum: Story = {
  args: {
    variant: 'default',
  },
};

export const highlight: Story = {
  args: {
    variant: 'highlight',
  },
};

export const success: Story = {
  args: {
    variant: 'success',
  },
};

export const warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const danger: Story = {
  args: {
    variant: 'danger',
  },
};
