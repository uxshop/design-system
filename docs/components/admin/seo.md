# Seo Component

## Purpose
A composite SEO metadata editor that combines editable form fields (meta title, meta description, meta keywords, and URL slug) with a live Google-search-result preview card. The preview shows how the page title, domain URL, and description will appear in search engine results. The component supports `v-model` binding over a `SeoInterface` object, can be rendered as write-only (hide preview), view-only (hide form), and auto-strips HTML tags from descriptions. A hint panel with character-limit guidance is shown by default in edit mode.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Seo } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | - | Optional page title (not directly rendered; provided for context). |
| domain | string | No | - | Domain shown in the preview card URL (e.g. `minha-loja.com.br`). |
| modelValue | SeoInterface | Yes | - | Two-way bound object containing `meta_title`, `meta_description`, `meta_keywords`, `slug`, and `name` fields. |
| viewOnly | boolean | No | `false` | When `true`, hides the form fields and shows only the preview card. |
| writeOnly | boolean | No | `false` | When `true`, hides the preview card and shows only the form fields. |
| isMetaTitle | boolean | No | `false` | When `true`, suppresses appending `metaTitle` to the preview title. |
| gray | boolean | No | `false` | Applies a gray background style modifier (`.-gray`) to the component root. |
| slugify | boolean | No | `true` | When `true`, the preview URL slug is auto-generated from the meta title. |
| keyTitle | string | No | `'meta_title'` | Key in `modelValue` to read the meta title from. |
| keySubTitle | string | No | `'meta_subtitle'` | Key in `modelValue` to read the meta subtitle from. |
| keyDescription | string | No | `'meta_description'` | Key in `modelValue` to read the meta description from. |
| metaTitle | string | No | - | Static suffix appended to the preview title separated by ` \| ` (e.g. the store name). |

## Events

- `@update:modelValue` — Emitted when any form field changes. Carries the updated `SeoInterface` object.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Seo } from '@tray-tecnologia/design-system';

const seoData = ref({
  meta_title: 'Tênis Running Pro',
  meta_description: 'O melhor tênis para corrida com tecnologia avançada.',
  meta_keywords: 'tênis, corrida, esporte',
  slug: 'tenis-running-pro',
});
</script>

<template>
  <!-- Full editor with live preview -->
  <Seo v-model="seoData" domain="minha-loja.com.br" meta-title="Minha Loja" />

  <!-- Preview-only mode -->
  <Seo v-model="seoData" domain="minha-loja.com.br" view-only />

  <!-- Form-only mode (no preview card) -->
  <Seo v-model="seoData" domain="minha-loja.com.br" write-only />
</template>
```

## Styling
The component uses `.ui-seo` as its root class and `.ui-seo-card` for the preview block. The `-gray` modifier adds a gray background when `gray` prop is set. Internal layout is handled with `Row`/`Col` grid components.

## A11y Notes
All form fields are rendered via `FormTextfield` which provides labelled inputs. The preview card is purely visual. Character-limit hints are visible in the `Alert` below the form fields.

## Related Components
- `FormTextfield` — used for each SEO input field
- `Alert` / `AlertTitle` — used for the character-limit tip panel
- `card-seo` — a read-only SEO preview card variant
