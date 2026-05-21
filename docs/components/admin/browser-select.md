# Browser Select Component

## Purpose
> **Deprecated** — This component is deprecated and will be removed in a future version.

A searchable record picker that opens a modal browser for selecting one or multiple items from a remote data source. It accepts a `service` object with `get` and `first` methods to fetch records, and supports two display modes: a text-input with a "Pesquisar" button (`selectType` defaults to input), or a clickable area button (`selectType="btn"`). Selected items are shown in a paginated list with remove buttons, and the chosen IDs are synced back via `v-model`. Internally it caches loaded records in memory to avoid redundant API calls.

## Status
⚠️ Deprecated — Do not use in new projects.

## Import
```ts
import { BrowserSelect } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| modelValue | any | No | - | Selected ID(s). A single value when `selectOne` is `true`, or an array of IDs. |
| service | `{ get(params): Promise<IApiResource>; first(id): any }` | Yes | - | API service object used to fetch records by IDs or search term. |
| selectOne | boolean | No | - | When `true` only one item can be selected and `modelValue` is a single ID rather than an array. |
| identifier | string | No | `'id'` | Property name used as the unique record identifier. |
| limit | number | No | `0` | Maximum number of items that can be selected. `0` means unlimited. |
| title | string | No | - | Title shown in the browser modal header. |
| templateCustom | any | No | - | Custom Vue component used to render each row in the selected-items list and in the modal. |
| searchBy | string \| null | No | - | Pre-populates the modal search term on open. |
| baseParams | unknown | No | - | Extra parameters merged into every `service.get` call (reserved for future use). |
| selectType | `'btn' \| 'input'` | No | `'input'` | Determines the trigger UI: `'input'` shows a text field + button; `'btn'` shows a clickable area. |
| hideList | boolean | No | - | Hides the selected-items list below the input. |
| hideExcludeButton | boolean | No | - | Hides the remove (×) button on each selected item. |
| hideBtn | boolean | No | - | When `selectType="btn"`, hides the trigger button entirely. |
| placeholder | string | No | `'Selecione'` | Placeholder text for the button-mode trigger area. |
| paginateListLimit | number | No | `5` | Number of selected items shown before a "Exibir mais" link appears. |
| noFetch | boolean | No | - | When `false` (default), automatically fetches record details when `modelValue` changes. |
| list | any | No | - | Provide an initial list of record objects to pre-populate the selected-items display without an API call. |

## Slots

| Slot | Description |
|------|-------------|
| button | Custom trigger rendered inside the `selectType="btn"` container. Replaces the default clickable area. |

## Events

- `@update:modelValue` — Emits the new selected ID(s) after a selection or removal, enabling `v-model`.
- `@update` — Same payload as `update:modelValue`; provided as a convenience alias.
- `@change` — Emits the full array of selected record objects whenever the selection changes.
- `@remove` — Emits the removed record object when an item is deselected from the list.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { BrowserSelect } from '@tray-tecnologia/design-system';
import { ProductService } from '@/services/ProductService';

const selectedProductId = ref<number | null>(null);
const selectedProductIds = ref<number[]>([]);
</script>

<template>
  <!-- Single selection -->
  <BrowserSelect
    v-model="selectedProductId"
    :service="ProductService"
    :select-one="true"
    title="Selecionar produto"
    placeholder="Escolha um produto" />

  <!-- Multiple selection with item limit -->
  <BrowserSelect
    v-model="selectedProductIds"
    :service="ProductService"
    :limit="5"
    title="Selecionar produtos"
    @change="(items) => console.log('Selected:', items)" />

  <!-- Button-mode trigger -->
  <BrowserSelect
    v-model="selectedProductIds"
    :service="ProductService"
    select-type="btn"
    title="Selecionar produtos">
    <template #button>
      <button>Abrir seletor</button>
    </template>
  </BrowserSelect>
</template>
```

## Styling
- Root element has class `ui-browser-select`.
- The input + button row uses `ui-browser-select-input`; the trigger area uses `ui-browser-select-button`.
- Selected-items list uses `ui-browser-list` and `ui-browser-list-row`; rows gain `-no-button` when `hideExcludeButton` is true.
- A `disabled` class is applied to the button trigger area when the `limit` is reached.

## A11y Notes
- The text-input mode provides a visible label context via the `placeholder` attribute; consider adding an explicit `<label>` in the parent.
- The remove button on each selected item uses `IconButton` (icon `close`) without a visible label — ensure the icon button provides an `aria-label`.
- The modal opened for browsing inherits accessibility from the `Modal` component.

## Related Components
- `BrowserSelectModal` — internal modal component that handles the search results grid.
- `FormTextfield` — used for the search input in input mode.
- `Button` — used for the search trigger button.
- `IconButton` — used for the row remove button.
