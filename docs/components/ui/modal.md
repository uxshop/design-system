# Modal Component

## Purpose
Overlay dialog for displaying content that demands user attention. Supports header, body, and footer slots for flexible layouts.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Modal } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| open | boolean | No | false | Show/hide modal |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | No | 'md' | Modal width |
| centered | boolean | No | false | Center modal vertically |
| closeButton | boolean | No | true | Show close button in header |
| backdrop | boolean | No | true | Show semi-transparent backdrop |
| backdropClose | boolean | No | true | Close on backdrop click |

## Slots

| Slot | Description |
|------|-------------|
| header | Modal header content (with close button) |
| default | Modal body content |
| footer | Modal footer content (usually buttons) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| open | - | Fired when modal opens |
| close | - | Fired when modal closes |

## Usage Examples

### Basic Modal
```vue
<template>
  <div>
    <Button label="Open Modal" @click="isOpen = true" />
    
    <Modal :open="isOpen" @close="isOpen = false">
      <template #header>
        <h2>Modal Title</h2>
      </template>
      
      <div>Modal content goes here</div>
      
      <template #footer>
        <Button label="Cancel" variant="secondary" @click="isOpen = false" />
        <Button label="Confirm" variant="primary" @click="handleConfirm" />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Modal, Button } from '@tray-tecnologia/design-system';

const isOpen = ref(false);

const handleConfirm = () => {
  console.log('Confirmed');
  isOpen.value = false;
};
</script>
```

### Large Modal
```vue
<template>
  <Modal :open="isOpen" size="lg" @close="isOpen = false">
    <template #header>Large Modal</template>
    <div>Content for large modal</div>
  </Modal>
</template>
```

## Styling

### CSS Classes
- `.ui-modal` — Root modal
- `.ui-modal.-open` — Open state
- `.ui-modal.-sm` — Small size
- `.ui-modal.-md` — Medium size
- `.ui-modal.-lg` — Large size
- `.ui-modal.-xl` — Extra large size
- `.ui-modal-backdrop` — Backdrop overlay

## A11y Notes
- Modal traps focus within itself
- Backdrop disables page scroll
- Escape key closes modal
- Close button has proper aria-label
- Focus returns to trigger element after close
- Dialog role applied automatically

## Related Components
- [Button](./button.md) — Action buttons in footer
- [Spinner](./spinner.md) — Loading indicator in modal

## Deprecations
None. This component is stable.
