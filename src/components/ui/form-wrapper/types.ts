import type { Size } from '../../../types';

export type ValueOfFormText = string | number | null;

export interface FormWrapperEmits<T = ValueOfFormText> {
  (event: 'update:modelValue', value: T): void;
  (event: 'internal-state', value: boolean | undefined): void;
}

export interface TextsCounter {
  counterInitialLimit: string;
  counterRemaining: string;
  counterExceeded: string;
  counterReachedLimit: string;
  wordRemaining: {
    singular: string;
    plural: string;
  };
  wordElement: {
    singular: string;
    plural: string;
  };
}

export interface FormWrapperDefaultProps {
  id?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  trailingText?: string;
  labelInfo?: string;
  state?: boolean;
  loading?: boolean;
  last?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  size?: Size;
  label?: string;
  /**
   * Altera o label do campo para a posição flutuante embutida no campo.
   */
  float?: boolean;
  /**
   * Texto que será exibido quando o campo estiver inválido, `state === false`.
   */
  invalidFeedback?: string;
  /**
   * Texto de ajuda que será exibido quando o campo estiver sem estado definido,
   * `state === undefined`.
   */
  helpFeedback?: string;
}

export interface FormWrapperCounterProps {
  /**
   * Tamanho mínimo de caracteres que o campo pode aceitar.
   */
  minlength?: number;
  /**
   * Tamanho máximo de caracteres que o campo pode aceitar.
   * Quando houver um valor definido o campo e o `showCounter` for igual a `true` exibirá um
   * contador de caracteres no local das mensagens de feedback. Caso seja utilizado as props
   * `invalidFeedback` ou `helpFeedback` o contador de caracteres será ocultado.
   */
  maxlength?: number;
  /**
   * Propriedade que permite que o campo de texto aceite um valor maior que o definido em maxlength
   * Se a propriedade for definida como true, o campo de texto não será marcado como inválido
   * quando o valor exceder o limite
   */
  allowExceedMaxLength?: boolean;
  /**
   * Textos que serão exibidos no contador de caracteres, se a propriedade `maxlength` for definida
   * no componente. Caso não seja definido aplica os textos padrões em pt-BR.
   */
  textsCounter?: TextsCounter;
  /**
   * Se definido como true e houver um `maxlength` definido com valor maior que 0 exibe um contador
   * de caracteres no campo de texto. Por padrão é false. Caso seja utilizado as props
   * `invalidFeedback` ou `helpFeedback` o contador de caracteres será ocultado.
   */
  showCounter?: boolean;
}

export interface FormWrapperProps
  extends Omit<FormWrapperDefaultProps, 'invalidFeedback' | 'helpFeedback'>,
    FormWrapperCounterProps {
  /**
   * Texto que será exibido quando o campo estiver inválido, `state === false`.
   * Caso o componente possua um contador de caracteres definido, o campo `invalidFeedback` terá
   * prioridade, ou seja, se essa propriedade for definida e tiver `state === false` o contador
   * não será exibido.
   */
  invalidFeedback?: string;
  /**
   * Texto de ajuda que será exibido quando o campo estiver sem estado definido,
   * `state === undefined`.
   * Caso o componente possua um contador de caracteres definido, o campo `helpFeedback` terá
   * prioridade, ou seja, se essa propriedade for definida e tiver `state === undefined` o contador
   * não será exibido.
   */
  helpFeedback?: string;
}
