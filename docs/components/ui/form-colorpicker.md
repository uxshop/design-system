# FormColorpicker Component

## Purpose
Color input picker for selecting colors.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormColorpicker } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|----------|-------------|
| modelValue | string | '' | Selected color hex |
| disabled | boolean | false | Disable picker |
| label | string | - | Field label |

## Slots
| Slot | Description |
|------|-------------|
| default | Picker content |

## Events
| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue | color string | Color changed |

## Styling
- `.ui-form-colorpicker` — Picker container
- `.ui-form-colorpicker-input` — Color input
- `.ui-form-colorpicker-preview` — Color preview

## A11y Notes
- Label associated with input
- Keyboard color selection
- Color names announced
- Hex/RGB both supported

## Related Components
- [FormWrapper](./form-wrapper.md) — Form container
- [Image](./image.md) — Color preview

## Deprecations
None. This component is stable.
