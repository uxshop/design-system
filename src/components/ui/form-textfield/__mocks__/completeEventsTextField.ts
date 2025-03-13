import { fn } from '@storybook/test';

export const completeEventsTextField: Record<string, unknown> = {
  onInternalState: fn(),
  onUpdate: fn(),
  onFocus: fn(),
  onBlur: fn(),
  onKeydown: fn(),
  onKeydownEnter: fn(),
  onClear: fn(),
  onUpdateRaw: fn(),
};
