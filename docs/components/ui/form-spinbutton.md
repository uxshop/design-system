# FormSpinbutton Component

## Purpose
Number spinner input with increment/decrement buttons.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormSpinbutton } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | number | - | Current value |
| min | number | - | Minimum value |
| max | number | - | Maximum value |
| step | number | 1 | Increment step |
| disabled | boolean | false | Disable input |
| label | string | - | Field label |

## Slots
| Slot | Description |
|------|-------------|
| default | Spinner content |

## Events
| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue | number | Value changed |
| increment | - | Plus button clicked |
| decrement | - | Minus button clicked |

## Styling
- `.ui-form-spinbutton` — Input container
- `.ui-form-spinbutton-btn` — +/- buttons
- `.ui-form-spinbutton-input` — Number input

## A11y Notes
- Label associated with input
- Min/Max enforced and announced
- Arrow keys increment/decrement
- Role="spinbutton" for assistive tech
- Increment/decrement announced

## Related Components
- [FormWrapper](./form-wrapper.md) — Form container
- [Button](./button.md) — Increment buttons

## Deprecations
None. This component is stable.
