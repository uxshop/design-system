# Aside Component

## Purpose
Sidebar/aside panel for secondary content.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Aside } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | true | Show/hide aside |
| width | number \| string | '300px' | Aside width |
| position | 'left' \| 'right' | 'left' | Position |

## Slots
| Slot | Description |
|------|-------------|
| default | Aside content |

## Events
| Event | Description |
|-------|-------------|
| close | Aside closed |

## Styling
- `.ui-aside` — Aside element
- `.ui-aside.-left` — Left position
- `.ui-aside.-right` — Right position

## A11y Notes
- Proper landmark role
- Keyboard close (Escape)
- Focus management
- Announced to screen readers

## Related Components
- [Modal](./modal.md) — Overlay alternative
- [Divider](./divider.md) — Section separator

## Deprecations
None. This component is stable.
