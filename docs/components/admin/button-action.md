# Button Action Component

## Purpose
> **Deprecated** — This component is deprecated and will be removed in a future version. Use the `Button` component instead.

Provides a set of contextual action buttons for admin table rows. Depending on the `type` prop it renders a remove icon button (`remove`), or a toggle button that displays an "Ativo"/"Inativo" text style (`active`). For the `delete` type it opens a confirmation dialog before emitting the delete event. The `active` type manages a two-way binding on the `active` prop and emits fine-grained status events.

## Status
⚠️ Deprecated — Do not use in new projects. Use `Button` instead.

## Import
```ts
import { ButtonAction } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| type | string | Yes | - | Action variant. Accepted values: `'remove'`, `'active'`, `'delete'`, or any Material icon name used as a fallback icon. |
| active | boolean | No | - | Current active/inactive state. Used only when `type` is `'active'`. |
| size | string | No | - | Optional size modifier applied as a CSS class (`-<size>`). |
| deleteName | string \| null | No | - | Name of the record shown in the delete confirmation dialog message. |
| noEvents | boolean | No | - | When `true`, suppresses `stopPropagation` on click so the event bubbles normally. |

## Events

- `@delete` — Emitted after the user confirms deletion in the dialog (receives the dialog callback boolean).
- `@inactive` — Emitted when `type` is `'active'` and the current state transitions from active to inactive.
- `@active` — Emitted when `type` is `'active'` and the current state transitions from inactive to active.
- `@close` — Declared but not currently emitted; reserved for future use.
- `@update:active` — Emits the toggled boolean value, enabling `v-model:active` usage.
- `@toggleActive` — Emitted on every toggle of the active state, regardless of direction.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ButtonAction } from '@tray-tecnologia/design-system';

const isActive = ref(true);

function onDelete(confirmed: boolean) {
  if (confirmed) myApi.delete(record.id);
}
</script>

<template>
  <!-- Toggle active/inactive state -->
  <ButtonAction
    type="active"
    v-model:active="isActive"
    @active="console.log('activated')"
    @inactive="console.log('deactivated')" />

  <!-- Delete with confirmation dialog -->
  <ButtonAction
    type="delete"
    delete-name="Produto X"
    @delete="onDelete" />

  <!-- Remove icon button -->
  <ButtonAction type="remove" />
</template>
```

## Styling
- Root element has class `ui-button-action` (applied to the `remove` icon button).
- Size modifier appended as `-<size>` (e.g., `-sm`) via the `size` prop.
- Active/inactive states are styled through `TextStyle` variant (`success` / `danger`).

## A11y Notes
- The `remove` variant renders an `IconButton` which includes an accessible icon label.
- The `active` toggle renders a `Button` with visible text ("Ativo"/"Inativo"), providing clear state indication.
- No ARIA live regions; consider adding one if real-time status updates matter for screen-reader users.

## Related Components
- `Button` — the recommended replacement for all action button use cases.
- `IconButton` — used internally for the `remove` variant.
- `TextStyle` — used internally to style active/inactive labels.
