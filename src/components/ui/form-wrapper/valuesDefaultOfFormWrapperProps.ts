export const valuesDefaultOfFormWrapperBaseProps = {
  state: undefined,
  loading: false,
  disabled: false,
  autofocus: false,
  float: false,
} as const;

export const valuesDefaultOfFormWrapperProps = {
  ...valuesDefaultOfFormWrapperBaseProps,
  allowExceedMaxLength: false,
  showCounter: false,
  textsCounter: () => ({
    counterInitialLimit: 'Você pode digitar até {{amount}} {{element}}',
    counterRemaining: 'Você tem {{amount}} {{element}} {{remaining}}',
    counterExceeded: 'Você atingiu o limite de {{element}}',
    counterReachedLimit: 'Você excedeu o limite em {{amount}} {{element}}',
    wordRemaining: {
      singular: 'restante',
      plural: 'restantes',
    },
    wordElement: {
      singular: 'caractere',
      plural: 'caracteres',
    },
  }),
} as const;
