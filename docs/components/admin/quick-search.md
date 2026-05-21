# Quick Search Component

## Purpose
A modal-based quick-search form that lets users search across a store or data set by choosing a search category and entering a keyword. It renders a `Modal` containing a `FormSelect` for the search type, a `FormTextfield` for the keyword, and a submit button. On submission it emits the combined `{ searchType, searchKey }` value and resets the form. The modal's visibility is controlled via `v-model`. On mobile widths the submit button expands to full width.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { QuickSearch } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| modelValue | boolean | Yes | - | Controls the modal open/close state (`v-model`). |
| searchOptions | FormSelectOptionsProp[] | Yes | - | Options for the search-type select. Each option requires at minimum `value` and `label` fields. |
| title | string | No | `'Busca rápida'` | Title displayed in the modal header. |
| caption | string | No | `'Encontre o que precisa na sua loja virtual.'` | Subtitle/caption displayed below the modal title. |
| placeholder | string | No | `'Ex: Camiseta Bagy'` | Placeholder text for the keyword input. |
| buttonLabel | string | No | `'Pesquisar'` | Label for the submit button. |

## Slots

| Slot | Description |
|------|-------------|
| default | Additional content rendered below the form fields, inside the `<form>` element. |

## Events

- `@onSubmit` — Emitted on form submission with an `IQuickSearchFormValue` payload: `{ searchType: string, searchKey: string }`. The form is reset after the event.
- `@update:modelValue` — Emitted when the modal is opened or closed, enabling `v-model`.
- `@onChangeOption` — Emitted when the user changes the search-type select, with the new option value as the payload.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QuickSearch } from '@tray-tecnologia/design-system';

const isOpen = ref(false);

const searchOptions = [
  { value: 'product', label: 'Produto' },
  { value: 'order', label: 'Pedido' },
  { value: 'customer', label: 'Cliente' },
];

function onSearch({ searchType, searchKey }: { searchType: string; searchKey: string }) {
  console.log('Searching:', searchType, searchKey);
  router.push({ name: 'search', query: { type: searchType, q: searchKey } });
}
</script>

<template>
  <button @click="isOpen = true">Busca rápida</button>

  <QuickSearch
    v-model="isOpen"
    :search-options="searchOptions"
    @onSubmit="onSearch" />
</template>
```

### Custom button label and placeholder

```vue
<template>
  <QuickSearch
    v-model="isOpen"
    :search-options="searchOptions"
    title="Localizar"
    caption="Digite o que deseja encontrar."
    placeholder="Ex: Pedido #1234"
    button-label="Buscar"
    @onSubmit="onSearch" />
</template>
```

## Styling
- The modal uses class `modal-container`; the inner form stack uses class `form` with an 8 px gap.
- On mobile (width ≤ `MOBILE_WIDTH` constant) the submit button receives `block` prop and expands to full width.
- Styling of the modal chrome is handled by the `Modal` component.

## A11y Notes
- The modal traps focus while open (inherited from `Modal`).
- The keyword input has `autofocus` so the user can start typing immediately after the modal opens.
- Form uses `@submit.prevent` with a native `<form>` element, so Enter key submission works naturally.
- Ensure `searchOptions` labels are descriptive so the select is understandable without surrounding context.

## Related Components
- `Modal` — wraps the entire quick-search UI.
- `FormSelect` — used for the search-type dropdown.
- `FormTextfield` — used for the keyword input.
- `Button` — used for the submit action.
- `Stack` — used to lay out the form fields vertically.
