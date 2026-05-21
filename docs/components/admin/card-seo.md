# Card Seo Component

## Purpose
A collapsible card that wraps the `Seo` component to allow editing SEO metadata (title, subtitle, description) for a record. The card header shows a read-only Google-style preview of the current values; expanding the dropdown reveals the editable form fields.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { CardSeo } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| modelValue | SeoInterface | Yes | — | The SEO data object (title, subtitle, description). Bound via `v-model` and synced to the inner `Seo` component. |
| keyTitle | string | No | — | Key used to map a field from the parent record as the default SEO title in the preview. |
| keySubTitle | string | No | — | Key used to map a field from the parent record as the default SEO subtitle in the preview. |
| keyDescription | string | No | — | Key used to map a field from the parent record as the default SEO description in the preview. |
| domain | string | Yes | — | The site domain displayed in the Google preview URL (e.g. `www.mystore.com.br`). |

## Events

- `@update:modelValue` — Emitted when any SEO field is edited, with the updated `SeoInterface` object. Supports `v-model` two-way binding.

## Usage Examples

### Basic usage
```vue
<script setup lang="ts">
import { CardSeo } from '@tray-tecnologia/design-system';
import type { SeoInterface } from '@tray-tecnologia/design-system';

const seo = ref<SeoInterface>({
  title: '',
  subTitle: '',
  description: '',
});
</script>

<template>
  <CardSeo
    v-model="seo"
    domain="www.minhaloja.com.br"
    keyTitle="name"
    keySubTitle="category"
    keyDescription="summary" />
</template>
```

### Inside a product form
```vue
<template>
  <form @submit.prevent="save">
    <!-- other fields ... -->
    <CardSeo v-model="product.seo" :domain="storeDomain" />
    <Button type="submit" label="Salvar" />
  </form>
</template>
```

## Styling
- Root element has the class `card-seo` applied on the inner `Card`.
- The card uses the `dropdown` and `dropdownClosed` props from `Card`, so it starts collapsed and has an "Editar" toggle label.
- The preview section in the header uses a gray background via the `gray` prop passed to `Seo`.

## A11y Notes
- The collapsible dropdown is controlled by the `Card` component's built-in toggle — focus management follows its implementation.
- Form fields inside the editable `Seo` component should carry appropriate `label` associations (handled by `Seo` internally).

## Related Components
- [`seo`](/docs/components/admin/seo.md) — the underlying SEO form and preview component
- [`card`](/docs/components/ui/card.md) — collapsible card wrapper used internally
