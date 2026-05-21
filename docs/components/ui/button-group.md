# ButtonGroup Component

## Purpose
Multiple buttons grouped together. Used for related action options.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { ButtonGroup } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| vertical | boolean | false | Stack buttons vertically |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |

## Slots
| Slot | Description |
|------|-------------|
| default | Button elements |

## Events
| Event | Description |
|-------|-------------|
| select | Option selected |

## Styling
- `.ui-button-group` — Group container
- `.ui-button-group.-vertical` — Vertical layout

## A11y Notes
- Buttons remain individually focusable
- Clear visual grouping
- Keyboard navigation between buttons
- Semantic HTML maintained

## Related Components
- [Button](./button.md) — Individual buttons
- [Dropdown](./dropdown.md) — Alternative for many options

## Deprecations
None. This component is stable.
