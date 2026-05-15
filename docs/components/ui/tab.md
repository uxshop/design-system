# Tab Component

## Purpose
Tabbed interface for organizing content. Supports multiple tabs with lazy loading.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Tab, TabItem } from '@tray-tecnologia/design-system';
```

## Props (Tab)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | number | 0 | Active tab index |
| animated | boolean | true | Animate transitions |

## Props (TabItem)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Tab label |
| disabled | boolean | false | Disable tab |

## Slots
| Slot | Description |
|------|-------------|
| default | Tab content |

## Events
| Event | Description |
|-------|-------------|
| change | Tab changed |

## Styling
- `.ui-tab` — Tab container
- `.ui-tab-nav` — Navigation
- `.ui-tab-content` — Content area

## A11y Notes
- Proper tab ARIA roles
- Arrow key navigation
- Screen reader announces active tab
- All tabs keyboard accessible

## Related Components
- [Button](./button.md) — Styled like tab buttons

## Deprecations
None. This component is stable.
