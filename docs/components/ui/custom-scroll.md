# CustomScroll Component

## Purpose
Custom scrollbar styling for containers.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { CustomScroll } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number \| string | - | Container height |
| dark | boolean | false | Dark scrollbar |
| thumb | string | - | Thumb color |

## Slots
| Slot | Description |
|------|-------------|
| default | Scrollable content |

## Events
| Event | Description |
|-------|-------------|
| scroll | Scroll event |

## Styling
- `.ui-custom-scroll` — Container
- `.ui-custom-scroll-track` — Track
- `.ui-custom-scroll-thumb` — Thumb

## A11y Notes
- Native scrolling behavior
- Keyboard scroll support
- Mouse wheel supported
- Touch scroll on mobile

## Related Components
- [InfiniteScroll](./infinite-scroll.md) — Infinite scroll wrapper

## Deprecations
None. This component is stable.
