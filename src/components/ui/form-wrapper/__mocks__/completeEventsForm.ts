import { fn } from '@storybook/test';

export const completeEventsForm: Record<string, unknown> = {
  [`onUpdate:modelValue`]: fn(),
  onInternalState: fn(),
};
