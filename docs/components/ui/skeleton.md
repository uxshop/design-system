# Skeleton Component

## Purpose
Placeholder during content loading. Creates loading skeleton UI.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Skeleton } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number \| string | '1rem' | Skeleton height |
| width | number \| string | '100%' | Skeleton width |
| circle | boolean | false | Circular skeleton |
| count | number | 1 | Number of skeletons |

## Styling
- `.ui-skeleton` — Skeleton element
- `.ui-skeleton.-circle` — Circular

## A11y Notes
- Use `aria-busy="true"` on container
- Replace with actual content when loaded
- Not announced as clickable

## Related Components
- [SkeletonList](./skeleton-list.md) — List skeleton
- [SkeletonTable](./skeleton-table.md) — Table skeleton

## Deprecations
None. This component is stable.
