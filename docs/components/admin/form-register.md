# Form Register Component

## Purpose
A form wrapper for admin record registration pages. It integrates a `Savebar` for edit-mode actions and a `FormValidation` display for server-side errors. The component wraps all form fields via the default slot, manages a hidden submit button to allow external save triggers, and emits a `save` event when the form is submitted. It guards against double submission with a 1-second cooldown and only processes the submit when both `editing` and `resource` are truthy.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormRegister } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| resource | any | Yes | - | The record being edited. The form will not submit unless this is truthy. |
| validate | Record<string, Record<string, string>> | No | - | Translation map passed to `FormValidation` for mapping server-side error keys to human-readable messages. |
| editing | boolean | No | - | When `true` the form is in edit mode and the `Savebar` becomes active. Submission is blocked when `false`. |

## Slots

| Slot | Description |
|------|-------------|
| default | Form fields to render inside the `<form>` element. |

## Events

- `@save` — Emitted when the form is submitted and both `editing` and `resource` are truthy. The parent is responsible for the actual API call.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { FormRegister } from '@tray-tecnologia/design-system';

const record = ref({ name: '' });
const isEditing = ref(true);

const validationMessages = {
  name: { required: 'Nome é obrigatório' },
};

async function onSave() {
  await myApi.update(record.value);
}
</script>

<template>
  <FormRegister
    :resource="record"
    :editing="isEditing"
    :validate="validationMessages"
    @save="onSave">
    <input v-model="record.name" placeholder="Nome" />
  </FormRegister>
</template>
```

## Styling
- Root element has class `ui-form-register`.
- The hidden submit button uses inline styles to remain invisible and zero-sized; do not target it with CSS.
- Layout and spacing for field content should be handled by the parent or via the slot.

## A11y Notes
- The form uses `@submit.prevent` to prevent default browser submission.
- The hidden submit button has `tabindex="-1"` so it is excluded from keyboard navigation.
- Use semantic form field labels inside the slot for screen-reader compatibility.

## Related Components
- `Savebar` — renders the save/cancel bar controlled by the `editing` prop.
- `FormValidation` — displays server-side validation errors mapped via `validate`.
