# Page Helper Articles Component

## Purpose
A composite help component that combines the `PageHelper` banner with a slide-in `Aside` drawer. When the user clicks the banner, a small side panel opens listing links to knowledge-base articles. Use this when a page has a set of related help articles that should be surfaced in context without leaving the page.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { PageHelperArticles } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | `'esse item'` | Topic name shown in the PageHelper banner and used as the drawer's context label. |
| articles | IArticle[] | No | `[]` | List of knowledge-base articles (`{ name: string; url: string }`) to display inside the drawer. |

## Usage Examples

```vue
<script setup lang="ts">
import { PageHelperArticles } from '@tray-tecnologia/design-system';

const articles = [
  { name: 'Como configurar frete grátis', url: 'https://help.tray.com.br/frete-gratis' },
  { name: 'Regras de frete por CEP',      url: 'https://help.tray.com.br/frete-cep' },
];
</script>

<template>
  <PageHelperArticles
    title="Configurações de frete"
    :articles="articles" />
</template>
```

## Styling
- The trigger banner inherits all `PageHelper` styles (border, hover, icon color).
- Inside the drawer, articles are rendered as a borderless list; each item has a light top border (`--s-border-light`) except the first.
- Items use `--s-spacing-xx-small` vertical padding for compact readability.
- The drawer is fixed to `size="sm"` — no customisation of drawer width is exposed.

## A11y Notes
- The `Aside` drawer manages focus trapping and the close button when open.
- Each article link opens in a new tab (`target="_blank"`); the `Link` component appends an external indicator to convey this to screen readers.
- Article `name` values should be descriptive enough to make sense as standalone link labels.

## Related Components
- [`PageHelper`](./page-helper.md) — base banner used as the trigger inside this component.
- [`PageHelperVideo`](./page-helper-video.md) — same pattern but surfaces a YouTube video instead of article links.
- [`PageMessageSupport`](./page-message-support.md) — simpler inline support link without a drawer.
