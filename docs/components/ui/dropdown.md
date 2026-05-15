# Dropdown Component

## Purpose
Contextual menu with list of options. Triggered by button or hovering.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Dropdown } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | string | - | Trigger text |
| placement | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | Menu position |
| closeOnClick | boolean | true | Close menu on option click |

## Slots
| Slot | Description |
|------|-------------|
| trigger | Trigger button content |
| default | Menu options |

## Events
| Event | Description |
|-------|-------------|
| select | Option selected |

## Styling
- `.ui-dropdown` — Dropdown container
- `.ui-dropdown-menu` — Menu list
- `.ui-dropdown-item` — Menu item

## A11y Notes
- Menu items are focusable
- Escape closes menu
- Arrow keys navigate items
- Semantic list structure
- Screen reader announcements

## Related Components
- [Button](./button.md) — Trigger button
- [ButtonGroup](./button-group.md) — Alternative layout

## Deprecations
None. This component is stable.
