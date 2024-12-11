import type { IndexTableEmptyResultProps, IndexTableEmptyMessageProps } from '../types';

export const defaultPropEmptyResultDisplay: IndexTableEmptyResultProps = {
  title: 'Nenhum resultado encontrado',
  subtitle:
    'Não encontramos nenhum item que corresponda à sua pesquisa.<br>Verifique o termo digitado ou tente um filtro diferente.',
  button: {
    label: 'Limpar filtros',
    variant: 'primary',
  },
  showIcon: true,
  showButton: true,
  show: false,
};

export const defaultPropIndexTableEmptyMessage: IndexTableEmptyMessageProps = {
  title: defaultPropEmptyResultDisplay.title,
  subtitle: defaultPropEmptyResultDisplay.subtitle,
  button: defaultPropEmptyResultDisplay.button,
  showIcon: defaultPropEmptyResultDisplay.showIcon ?? true,
  showButton: defaultPropEmptyResultDisplay.showButton ?? true,
};
