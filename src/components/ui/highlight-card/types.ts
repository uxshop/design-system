import type { VariantsStandard } from '#ds/types';

export type HighlightCardProps = {
  /**
   * Texto da etiqueta
   */
  label: string;
  /**
   * Ícone a ser exibido
   */
  icon?: string;
  /**
   * Valor numérico a ser exibido
   */
  value?: number;
  /**
   * Função para formatação do valor a ser exibido
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
   * Duração da animação de contagem em milissegundos
   */
  animationDuration?: number;
  /**
   * Define a quantidade de casas decimais que será exibida com a animação
   */
  animationDecimals?: number;
  /**
   * Habilita ou desabilita a animação de contagem do valor, por padrão é habilitada
   */
  animationEnabled?: boolean;
};

export type HighlightCardSlots = {
  icon(): void;
  label(): void;
};
