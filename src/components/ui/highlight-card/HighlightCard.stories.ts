import { VariantStandard } from '#ds/constants';
import type { Meta, StoryObj } from '@storybook/vue3';
import HighlightCard from './HighlightCard.vue';
import HighlightCardGroup from './HighlightCardGroup.vue';
import { Icon } from '#ds/index';
import './HighlightCard.scss';
import type { VariantsStandard } from '#ds/types';

const variants: VariantsStandard[] = [
  VariantStandard.DEFAULT,
  VariantStandard.HIGHLIGHT,
  VariantStandard.SUCCESS,
  VariantStandard.WARNING,
  VariantStandard.CRITICAL,
];

/**
 * > O componente HighlightCard apresenta dados de forma destacada e organizada.
 * > Ele combina label, valor e ícone, sendo amplamente usado para resumos de métricas ou
 * > informações-chave, com variações visuais que atendem a diferentes necessidades.
 *
 * Este componente pode ser utilizado para exibir no valor em destaque um valor numérico
 * ou um texto, e o valor numérico por padrão possui uma animação de contagem até o valor
 * final.
 *
 * ## Slots possíveis
 *
 * - **`icon`**: Slot para substituir o ícone do componente.
 * - **`value`**: Slot para substituir o valor do componente. Nesse slot é possível
 * acessar o `displayValue` para exibir o valor formatado.
 * - **`label`**: Slot para substituir a label do componente. Nesse slot é possível
 *  acessar o `label` e `labelInfo` para exibir a label e a informação adicional para tooltip.
 */
const meta: Meta<typeof HighlightCard> = {
  title: 'Ui/HighlightCard',
  tags: ['beta'],
  component: HighlightCard,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
    loading: {
      control: 'boolean',
    },
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      controls: { exclude: '^on.*' },
    },
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const minimum: Story = {
  args: {
    variant: VariantStandard.DEFAULT,
    label: 'Vendas mensais',
    icon: 'shopping_cart',
    value: 15000,
    valueFormatter: (value: number) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
  },
};

export const defaultNegativeValue: Story = {
  args: {
    variant: VariantStandard.DEFAULT,
    label: 'Vendas perdidas',
    icon: 'shopping_cart',
    value: -800,
    valueFormatter: (value: number) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
  },
};

export const highlight: Story = {
  args: {
    variant: VariantStandard.HIGHLIGHT,
    icon: 'trending_up',
    label: 'Total de vendas',
    animationDecimals: 2,
    value: 45890.12,
    valueFormatter: (value: number) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
  },
};

export const success: Story = {
  args: {
    variant: VariantStandard.SUCCESS,
    icon: 'analytics',
    label: 'Pedidos concluídos',
    value: 128,
  },
};

export const warning: Story = {
  args: {
    variant: VariantStandard.WARNING,
    icon: 'warning',
    label: 'Pedidos pendentes',
    value: 23,
  },
};

export const critical: Story = {
  args: {
    variant: VariantStandard.CRITICAL,
    icon: 'error',
    label: 'Pedidos cancelados',
    value: 7,
  },
};

export const withTextValue: Story = {
  args: {
    variant: VariantStandard.SUCCESS,
    icon: 'leaderboard',
    label: 'Cliente com ticket médio mais alto',
    value: 'João da Silva',
  },
};

export const withLabelInfo: Story = {
  args: {
    icon: 'shopping_cart',
    label: 'Pedidos cancelados',
    value: 7,
    labelInfo: 'Pedidos com informações incorretas ou cancelados manualmente',
  },
  render: (args) =>
    ({
      components: { HighlightCard, Icon },
      setup() {
        return { args };
      },
      template: /* html */ `
        <HighlightCard v-bind="args" style="margin-top: 80px;" />
      `,
    }) as any,
};

export const loading: Story = {
  args: {
    loading: true,
    label: 'Cliques',
    icon: 'ads_click',
  },
};

export const customSlots: Story = {
  args: {
    variant: VariantStandard.HIGHLIGHT,
    animationEnabled: false,
    value: 30,
    valueFormatter: (value: number) => `${value}%`,
    icon: 'trending_up',
    label: '',
  },
  render: (args) =>
    ({
      components: { HighlightCard, Icon },
      setup() {
        return { args };
      },
      template: /* html */ `
        <HighlightCard v-bind="args">
          <template #icon>
            <Icon name="trending_up" size="18" />
          </template>
          <template #label>
            <span style="display: flex; align-items: center; gap: 4px;">
              Crescimento mensal
              <Icon name="calendar_month" size="13" />
            </span>
          </template>
        </HighlightCard>
      `,
    }) as any,
};

export const withHighlightCardGroup: Story = {
  render: (args) => ({
    components: { HighlightCard, HighlightCardGroup },
    setup() {
      const valueFormatterPercentage = (value: number) => {
        return `+${value}%`;
      };

      const valueFormatterCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
      };

      return { args, valueFormatterPercentage, valueFormatterCurrency };
    },
    template: /* html */ `
    <div style="padding: 16px;">
      <HighlightCardGroup>
        <HighlightCard
          variant="${VariantStandard.DEFAULT}"
          label="Vendas mensais"
          icon="shopping_cart"
          :value="15000"
          :value-formatter="valueFormatterCurrency"
        />
        <HighlightCard
          variant="${VariantStandard.SUCCESS}"
          label="Percentual de vendas"
          icon="analytics"
          :value="28"
          :value-formatter="valueFormatterPercentage"
        />
        <HighlightCard
          variant="${VariantStandard.WARNING}"
          label="Pedidos pendentes"
          icon="warning"
          :value="23"
        />
      </HighlightCardGroup>
    </div>
    `,
  }),
};
