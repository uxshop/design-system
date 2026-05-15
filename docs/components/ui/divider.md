# Divider Component

## Purpose
Visual separator line between content sections.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Divider } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| horizontal | boolean | true | Horizontal line |
| vertical | boolean | false | Vertical line |
| color | string | - | Custom color |

## Slots
| Slot | Description |
|------|-------------|
| default | Content (optional) |

## Styling
- `.ui-divider` — Divider element
- `.ui-divider.-horizontal` — Horizontal
- `.ui-divider.-vertical` — Vertical

## A11y Notes
- Semantic `<hr>` or role="separator"
- Not focusable (decorative)
- Aria-hidden if truly decorative

## Related Components
- [Aside](./aside.md) — May use divider for sections

## Deprecations
None. This component is stable.
