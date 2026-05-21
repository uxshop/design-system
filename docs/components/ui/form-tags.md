# FormTags Component

## Purpose
Tag input field for entering multiple tags.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormTags } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string[] | [] | Selected tags |
| disabled | boolean | false | Disable input |
| label | string | - | Field label |
| placeholder | string | - | Input placeholder |
| maxTags | number | - | Max tag count |

## Slots
| Slot | Description |
|------|-------------|
| default | Tag content |

## Events
| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue | tags array | Tags changed |
| add-tag | tag string | Tag added |
| remove-tag | tag string | Tag removed |

## Styling
- `.ui-form-tags` — Input container
- `.ui-form-tags-tag` — Individual tag
- `.ui-form-tags-input` — Text input

## A11y Notes
- Label associated with input
- Tag removal via button or Delete key
- Screen reader announces tag count
- Keyboard navigation between tags

## Related Components
- [Tag](./tag.md) — Individual tag display
- [FormWrapper](./form-wrapper.md) — Form container

## Deprecations
None. This component is stable.
