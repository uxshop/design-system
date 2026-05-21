# Page Message Support Component

## Purpose
A compact inline message that nudges users toward the knowledge base. It renders an info icon followed by the text "Saiba mais sobre [name] na base de conhecimento." where `name` is a clickable external link pointing to `link`. Use it below headings or descriptions when a single help article is the most relevant support resource for a page or section.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { PageMessageSupport } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| name | string | Yes | - | Display label for the article link shown inside the sentence. |
| link | string | Yes | - | Full URL of the knowledge-base article opened when the user clicks `name`. |

## Usage Examples

```vue
<script setup lang="ts">
import { PageMessageSupport } from '@tray-tecnologia/design-system';
</script>

<template>
  <PageMessageSupport
    name="SEO da loja"
    link="https://help.tray.com.br/seo-da-loja" />
</template>
```

## Styling
- Rendered as a horizontal flex row; the `Icon` and text span sit side by side.
- Uses the `Link` component in `external` mode, which appends an external-link indicator to the label.
- No background or border — integrates seamlessly inside cards, panels, or page bodies.

## A11y Notes
- The info icon should be `aria-hidden="true"` because the surrounding text already conveys the intent.
- The `Link` component in `external` mode appends a visually hidden "(abre em nova aba)" hint for screen readers.
- Keep `name` descriptive enough to make sense as a standalone link label.

## Related Components
- [`PageHelper`](./page-helper.md) — banner-style help trigger with an optional direct link or click event.
- [`PageHelperArticles`](./page-helper-articles.md) — shows multiple articles inside a drawer instead of a single inline link.
- [`PageHelperVideo`](./page-helper-video.md) — surfaces a help video via a drawer.
