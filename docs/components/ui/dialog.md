# Dialog Component

## Purpose
Modal dialog window for critical decisions or important information. Overlays main content and requires user action to dismiss.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Dialog } from '@tray-tecnologia/design-system';
```

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Events

- `@close` — [TODO: Add description]
- `@callback` — [TODO: Add description]

## Usage Examples

### Confirmation Dialog
```vue
<template>
  <Dialog @callback="handleConfirm" @close="showDialog = false">
    <p>Are you sure? This action cannot be undone.</p>
  </Dialog>
</template>

<script setup>
import { Dialog } from '@tray-tecnologia/design-system';
</script>
```

### Information Dialog
```vue
<template>
  <Dialog @close="showInfo = false">
    <p>System maintenance scheduled for tonight 2-4 AM.</p>
  </Dialog>
</template>
```

## Styling
Dialog background overlay is semi-transparent dark. Dialog box centered on screen with box shadow. Close button in header.

## A11y Notes
Dialog traps focus within itself. Esc key closes dialog. Background content is inert (aria-hidden). Dialog has role='dialog' and aria-modal='true'. Initial focus set to first interactive element.

## Related Components
- [Modal](#modal) — Similar overlay component
- [Alert](#alert) — For simpler messages
