# FormWrapper Component

## Purpose
Form container with submit handling.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormWrapper } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| novalidate | boolean | false | Skip browser validation |
| inline | boolean | false | Inline form layout |

## Slots
| Slot | Description |
|------|-------------|
| default | Form fields |

## Events
| Event | Description |
|-------|-------------|
| submit | Form submitted |

## Styling
- `.ui-form-wrapper` — Form element
- `.ui-form-wrapper.-inline` — Inline layout

## A11y Notes
- Semantic `<form>` element
- Label all inputs
- Error messages associated
- Submit button clear
- Tab order logical

## Related Components
- [Button](./button.md) — Submit button
- [FormValidation](./form-validation.md) — Error display

## Deprecations
None. This component is stable.
