# IndexTable Component

## Purpose
Data table with sorting, filtering, and pagination.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { IndexTable } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | Array | - | Column definitions |
| rows | Array | - | Table rows |
| sortable | boolean | true | Enable sorting |
| selectable | boolean | false | Enable row selection |
| striped | boolean | true | Striped rows |

## Slots
| Slot | Description |
|------|-------------|
| header | Table header |
| row | Row content |

## Events
| Event | Description |
|-------|-------------|
| sort | Column sorted |
| select | Row selected |

## Styling
- `.ui-index-table` — Table
- `.ui-index-table.-striped` — Striped rows
- `.ui-index-table-row.-selected` — Selected row

## A11y Notes
- Proper table semantic structure
- Sortable columns announce state
- Selection via checkbox or row click
- Keyboard navigation

## Related Components
- [Pagination](./pagination.md) — For page navigation
- [SkeletonTable](./skeleton-table.md) — Loading state

## Deprecations
None. This component is stable.
