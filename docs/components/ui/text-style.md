# TextStyle Component

## Purpose
Typography/text formatting wrapper.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { TextStyle } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'body' | Text style |
| as | string | 'span' | HTML element |
| weight | 'light' \| 'normal' \| 'bold' | - | Font weight |
| color | string | - | Text color |

## Slots
| Slot | Description |
|------|-------------|
| default | Text content |

## Styling
- `.ui-text-style` — Text wrapper
- `.ui-text-style.-heading` — Heading variant
- `.ui-text-style.-body` — Body variant
- `.ui-text-style.-caption` — Caption variant

## A11y Notes
- Use semantic HTML elements (h1, p, etc)
- Color not sole indicator
- Sufficient contrast ratio
- Line height for readability

## Related Components
- [Button](./button.md) — Text in buttons
- [Link](./link.md) — Styled text links

## Deprecations
None. This component is stable.
