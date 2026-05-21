# Row Exclude Component

## Purpose
A selectable list that works on an "exclude" model: every item starts as included (checked), and toggling an item removes it from the selection. The component emits the array of **excluded** IDs via `v-model` / `@update`. Useful for "apply to all except…" patterns, such as choosing which stores or channels are exempt from a rule.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { RowExclude } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| rows | IRow[] | Yes | — | Full list of items to display. Each item must have `id: number` and `name: string`. |
| modelValue | number[] | Yes | — | Array of **excluded** IDs. An empty array means all items are included. Bind with `v-model`. |

### IRow

```ts
interface IRow {
  id: number;
  name: string;
}
```

## Events

- `@update:modelValue` — Emitted on every toggle with the updated array of excluded IDs. Enables `v-model` binding.
- `@update` — Same payload as `update:modelValue`. Provided as a convenience event for cases where `v-model` is not used.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { RowExclude } from '@tray-tecnologia/design-system';

const stores = [
  { id: 1, name: 'Loja São Paulo' },
  { id: 2, name: 'Loja Rio de Janeiro' },
  { id: 3, name: 'Loja Belo Horizonte' },
];

// Starts with store 2 excluded
const excludedStoreIds = ref<number[]>([2]);
</script>

<template>
  <RowExclude v-model="excludedStoreIds" :rows="stores" />
  <p>Excluídos: {{ excludedStoreIds }}</p>
</template>
```

### All items included (empty exclusion list)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { RowExclude } from '@tray-tecnologia/design-system';

const channels = [
  { id: 10, name: 'Canal A' },
  { id: 11, name: 'Canal B' },
];

const excluded = ref<number[]>([]);
</script>

<template>
  <!-- All rows start checked; uncheck to exclude -->
  <RowExclude v-model="excluded" :rows="channels" />
</template>
```

## Styling
- Each row is a `.selectable-list-item` div; the `-selected` modifier is applied when the item is currently **included** (checked).
- The component uses `FormCheckbox` internally — checkbox appearance follows the design-system form styles.
- Layout is vertical by default; override via `.selectable-list` if horizontal layout is needed.

## A11y Notes
- Each item renders a `FormCheckbox` with a visible label (`item.name`), giving screen readers a meaningful control name.
- Clicking anywhere on the row (`.selectable-list-item`) toggles the checkbox, expanding the hit area.
- Items are not focusable as a group container; rely on the `FormCheckbox` focus ring for keyboard navigation.

## Related Components
- `FormCheckbox` — the checkbox control rendered inside each row.
- `Table` — use when displaying tabular exclude/include data with additional columns.
- `TableList` / `IndexTable` — higher-level list views that manage their own selection state.
