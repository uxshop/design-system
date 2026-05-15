# DescriptionList Component

## Purpose
Key-value pair list display.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { DescriptionList } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | Array | - | List items |
| columns | number | 1 | Column count |

## Slots
| Slot | Description |
|------|-------------|
| default | List items |

## Styling
- `.ui-description-list` — List container
- `.ui-description-list-item` — Item
- `.ui-description-list-term` — Term/key
- `.ui-description-list-definition` — Definition/value

## A11y Notes
- Semantic `<dl>`, `<dt>`, `<dd>` tags
- Proper structure for definitions
- Screen reader accessible

## Related Components
- [Table](./index-table.md) — Alternative layout

## Deprecations
None. This component is stable.
