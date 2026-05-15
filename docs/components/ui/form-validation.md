# FormValidation Component

## Purpose
Display form validation error messages.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormValidation } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | string | - | Error message |
| type | 'error' \| 'warning' \| 'success' | 'error' | Message type |
| show | boolean | true | Show message |

## Slots
| Slot | Description |
|------|-------------|
| default | Message content |

## Styling
- `.ui-form-validation` — Message container
- `.ui-form-validation.-error` — Error state
- `.ui-form-validation.-warning` — Warning state
- `.ui-form-validation.-success` — Success state

## A11y Notes
- Messages associated with input via aria-describedby
- Role="alert" for errors
- Announced to screen readers
- Color not sole indicator

## Related Components
- [FormWrapper](./form-wrapper.md) — Form container
- [Button](./button.md) — Validation on click

## Deprecations
None. This component is stable.
