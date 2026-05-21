# NewsIndicator Component

## Purpose
Badge for marking new or updated items.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { NewsIndicator } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| badge | boolean | true | Show badge |
| label | string | 'New' | Badge text |
| color | string | 'danger' | Badge color |

## Slots
| Slot | Description |
|------|-------------|
| default | Item content |

## Styling
- `.ui-news-indicator` — Container
- `.ui-news-indicator-badge` — Badge

## A11y Notes
- Badge announced to screen readers
- Semantic structure maintained
- Color not sole indicator

## Related Components
- [Tag](./tag.md) — Categorical label
- [Button](./button.md) — With badge

## Deprecations
None. This component is stable.
