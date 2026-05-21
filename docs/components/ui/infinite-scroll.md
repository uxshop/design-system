# InfiniteScroll Component

## Purpose
Infinite scroll trigger for loading more content.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { InfiniteScroll } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| threshold | number | 100 | Pixels from bottom |
| disabled | boolean | false | Disable infinite scroll |
| loading | boolean | false | Show loading state |

## Slots
| Slot | Description |
|------|-------------|
| default | Scrollable content |

## Events
| Event | Description |
|-------|-------------|
| load-more | Trigger scroll |

## Styling
- `.ui-infinite-scroll` — Container
- `.ui-infinite-scroll.-loading` — Loading state

## A11y Notes
- Announce loading state
- Provide alternative pagination
- Keyboard accessible
- Not just mouse/scroll dependent

## Related Components
- [CustomScroll](./custom-scroll.md) — Scroll wrapper
- [Pagination](./pagination.md) — Alternative

## Deprecations
None. This component is stable.
