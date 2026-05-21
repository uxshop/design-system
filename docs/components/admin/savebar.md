# Savebar Component

## Purpose
Floating action bar that slides into view when a form is in an unsaved state. Displays "Alterações feitas" along with "Descartar alterações" (discard) and "Salvar" (save) buttons. Visibility is driven by the `editing` prop or by a `register` injection object (which allows a parent form provider to control save state globally). When active, it adds `is-editing` to `document.body` so the page layout can adjust its bottom padding.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Savebar } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| loading | boolean | No | `false` | When `true`, shows a loading spinner on the save button and disables both buttons |
| editing | boolean | No | `false` | When `true`, the savebar becomes visible; can also be driven via the `register` injection |

## Events

- `@discard` — Emitted when the "Descartar alterações" button is clicked; also calls `register.discard()` if injected
- `@save` — Emitted when the "Salvar" button is clicked

## Usage Examples

### Controlled via `editing` prop
```vue
<script setup lang="ts">
import { Savebar } from '@tray-tecnologia/design-system';
import { ref } from 'vue';

const isDirty = ref(false);
const isSaving = ref(false);

const save = async () => {
  isSaving.value = true;
  await saveForm();
  isDirty.value = false;
  isSaving.value = false;
};

const discard = () => {
  resetForm();
  isDirty.value = false;
};
</script>

<template>
  <Savebar :editing="isDirty" :loading="isSaving" @save="save" @discard="discard" />
</template>
```

### Controlled via `register` injection (global form context)
```vue
<!-- In the parent provider component -->
<script setup lang="ts">
import { provide, reactive } from 'vue';

const register = reactive({ editing: false, discard: () => resetAll() });
provide('register', register);
</script>

<template>
  <Savebar @save="handleSave" />
</template>
```

## Styling
- Root class: `ui-savebar`; receives `-show` modifier when `editing` is true to slide the bar into view.
- When visible, `is-editing` is added to `document.body` — use this class to add bottom padding to the page.
- Inner layout uses `ui-savebar-container` (a `Container` grid), `ui-savebar-text`, and `ui-savebar-actions`.

## A11y Notes
- Both action buttons become `disabled` during `loading`, preventing double-submit.
- The bar is hidden off-screen until `editing` is true; consider adding `aria-live="polite"` on the container at the integration level to announce unsaved state changes.

## Related Components
- [`Page`](./page.md) — page-level container typically used alongside `Savebar`
- [`Button`](../ui/button.md) — used internally for the discard and save buttons
