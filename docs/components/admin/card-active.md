# Card Active Component

## Purpose
A card that combines an active/inactive toggle switch with an optional delete action for a record. Used in admin panels to control whether an entity (e.g. a product, category, or rule) is enabled, and to remove it via a confirmation dialog.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { CardActive } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| modelValue | any | Yes | `{ active: true }` | The record object. Must include `active` (boolean) to control the toggle; `id` (number) is required for the delete button to appear; `name` (string) is used in the confirmation dialog message. |
| hideDelete | boolean | No | `false` | Hides the delete icon button. Useful when deletion is not allowed for the current record or user role. |
| preventActive | function | No | — | Callback invoked before the toggle changes. Call this to intercept and prevent the default active-change behavior (e.g. to show a custom confirmation). |
| delete | function | No | — | Async function that receives the record `id` and performs the deletion. Called after the user confirms the delete dialog. |

## Events

- `@delete` — Emitted after the delete confirmation succeeds, with `{ id }` payload. Use this to refresh a list or show a toast.
- `@toggleActive` — Emitted when the active switch changes, with the new boolean value as payload.
- `@update:modelValue` — Standard v-model update event for two-way binding of the record object.

## Usage Examples

### Basic — toggle only
```vue
<script setup lang="ts">
import { CardActive } from '@tray-tecnologia/design-system';

const record = ref({ id: 1, name: 'Banner principal', active: true });
</script>

<template>
  <CardActive
    v-model="record"
    @toggleActive="(val) => console.log('active changed to', val)" />
</template>
```

### With async delete
```vue
<script setup lang="ts">
import { CardActive } from '@tray-tecnologia/design-system';
import { deleteProduct } from '@/services/products';

const product = ref({ id: 42, name: 'Camiseta P', active: false });
</script>

<template>
  <CardActive
    v-model="product"
    :delete="deleteProduct"
    @delete="({ id }) => removeFromList(id)"
    @toggleActive="saveActiveState" />
</template>
```

### Hide delete button
```vue
<template>
  <CardActive v-model="record" hide-delete />
</template>
```

## Styling
- Root element has the class `ui-card-active` and is wrapped in a `Card` component.
- The toggle and delete button are laid out in a `Row`/`Col` grid: the toggle takes all remaining space, the delete button is auto-width.
- No custom CSS variables are exposed; spacing and borders come from the `Card` component styles.

## A11y Notes
- The toggle is rendered as a `<FormCheckbox switch>`, which outputs a native `<input type="checkbox" role="switch">` — accessible by default.
- The delete `IconButton` should be paired with a visible or sr-only label if the icon alone is insufficient context (the dialog title provides context after activation).
- The confirmation dialog (`$dialog.delete`) traps focus and returns it to the trigger after closing.

## Related Components
- [`card`](/docs/components/ui/card.md) — base card wrapper used internally
- [`form-checkbox`](/docs/components/ui/form-checkbox.md) — switch toggle used for the active state
- [`icon-button`](/docs/components/ui/icon-button.md) — delete trigger button
- [`dialog`](/docs/components/ui/dialog.md) — confirmation dialog invoked on delete
