import type { ButtonProps } from '../button';
import type { IconProps } from '../icon';

export interface FeedbackMessageEmits {
  (event: 'action'): void;
}

export interface FeedbackMessageProps {
  /** Define o texto principal do componente */
  title?: string;
  /** Define o texto secundário do componente */
  subtitle?: string;
  /** Configura o ícone do topo a ser exibido, disponibilizando todas as props do componetne Icon */
  icon?: IconProps;
  /** Configura o botão de ação do componente, disponibilizando todas as props do componente Button */
  button?: ButtonProps;
  /** Define se o ícone será exibido */
  showIcon: boolean;
  /** Define se o botão de ação será exibido */
  showButton: boolean;
}
