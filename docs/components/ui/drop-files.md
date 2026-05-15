# DropFiles Component

## Purpose
File drag-and-drop zone for uploads.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { DropFiles } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string | '*' | File types |
| multiple | boolean | true | Allow multiple files |
| disabled | boolean | false | Disable drop zone |

## Slots
| Slot | Description |
|------|-------------|
| default | Drop zone content |

## Events
| Event | Description |
|-------|-------------|
| drop | Files dropped |
| change | Files selected |

## Styling
- `.ui-drop-files` — Drop zone
- `.ui-drop-files.-active` — Active/hovering
- `.ui-drop-files.-disabled` — Disabled

## A11y Notes
- Keyboard upload alternative
- Proper file input labeling
- Clear instructions for drag-drop
- Error messages announced

## Related Components
- [FormWrapper](./form-wrapper.md) — Form container
- [Button](./button.md) — File upload button

## Deprecations
None. This component is stable.
