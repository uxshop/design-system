import type { VariantsStandard } from '#ds/types';

export type HighlightCardProps = {
  /**
   * Texto da etiqueta
   */
  label: string;
  /**
   * Informação adicional a ser exibida em tooltip
   */
  labelInfo?: string;
  /**
   * Ícone a ser exibido
   */
  icon?: string;
  /**
   * Valor em destaque a ser exibido.
   * Quando o valor é um número e a animação está habilitada, uma animação de contagem
   * será exibida.
   */
  value?: number | string;
  /**
   * Função para formatação do valor numérico a ser exibido, usado quando o `value` é
   * um número que precisa receber alguma formatação em específico.
   */
  valueFormatter?: (value: number) => string;
  /**
   * Variante a ser utilizada
   */
  variant?: VariantsStandard;
  /**
   * Indica se o componente está em carregamento
   */
  loading?: boolean;
  /**
   * Duração da animação de contagem em milissegundos.
   */
  animationDuration?: number;
  /**
   * Define a quantidade de casas decimais que será exibida com a animação de contagem.
   */
  animationDecimals?: number;
  /**
   * Habilita ou desabilita a animação de contagem do valor, por padrão é habilitada.
   * A animação de contagem só funciona se a propriedade `value` for do tipo `number`.
   */
  animationEnabled?: boolean;
};

export interface HighlightCardSlotValueProps {
  displayValue: string | undefined;
}

export interface HighlightCardSlotLabelProps {
  label: string;
  labelInfo?: string;
}

export type HighlightCardSlots = {
  icon(): void;
  value(props: HighlightCardSlotValueProps): void;
  label(props: HighlightCardSlotLabelProps): void;
};
