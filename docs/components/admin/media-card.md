# Media Card Component

## Purpose
A content card that pairs a media element (image or YouTube video) with a title, description, and one or more action buttons. Videos are shown as a thumbnail with a play overlay; clicking opens the video in a full-screen modal. Common use cases include onboarding guides, feature highlights, and help content sections.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { MediaCard } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | — | Card heading displayed above the text content. |
| text | string | Yes | — | Body copy rendered as HTML (`v-html`). Supports inline markup. |
| video | string | No | — | YouTube video ID (e.g. `dQw4w9WgXcQ`). When provided, a thumbnail with play icon is shown instead of `image`; clicking opens the video in a modal. |
| image | string | No | — | URL of the image to display when no `video` is provided. |
| imageHref | string | No | — | Wraps the image in an anchor pointing to this URL. |
| imageTarget | `'_blank'` \| `'_self'` | No | `'_self'` | Link target for the image anchor. |
| inverse | boolean | No | `false` | Applies the `-inverted` modifier class, swapping the media/content order visually. |
| buttons | ActionButton[] | No | — | Array of action buttons rendered below the text. Each item accepts `label`, `to`, `target`, `size`, `variant`, and `onAction`. |
| vertical | boolean | No | `false` | Applies the `-vertical` modifier class to stack media and content vertically instead of side-by-side. |
| maxMediaHeight | number | No | — | Constrains the height of the media element in pixels via an inline `max-height` style. |

## Usage Examples

### Image card with a button
```vue
<script setup lang="ts">
import { MediaCard } from '@tray-tecnologia/design-system';
</script>

<template>
  <MediaCard
    title="Como configurar o checkout"
    text="Personalize o fluxo de compra da sua loja em poucos passos."
    image="/assets/checkout-setup.png"
    imageHref="https://docs.example.com/checkout"
    imageTarget="_blank"
    :buttons="[{ label: 'Ver documentação', to: 'https://docs.example.com/checkout', target: '_blank' }]" />
</template>
```

### Video card
```vue
<template>
  <MediaCard
    title="Conheça as novidades"
    text="Assista ao vídeo e veja as principais funcionalidades lançadas nesta versão."
    video="dQw4w9WgXcQ"
    :maxMediaHeight="200" />
</template>
```

### Vertical layout
```vue
<template>
  <MediaCard
    title="Dica rápida"
    text="Use as categorias para organizar seu catálogo."
    image="/assets/tip.png"
    vertical />
</template>
```

## Styling
- Root element uses the class `ui-media-card`, with optional modifiers `-inverted`, `-video`, and `-vertical`.
- Media wrapper uses `ui-media-card-video` or `ui-media-card-image` depending on the prop.
- Content area uses `ui-media-card-info` and `ui-media-card-info-buttons`.
- Styles are defined in `MediaCard.scss`.

## A11y Notes
- The play icon overlay on video thumbnails is not keyboard-accessible by default; consider adding `tabindex="0"` and a `keydown` handler if keyboard navigation is required.
- Images should be paired with meaningful `alt` text — currently the `<img>` has no `alt` prop; set it via CSS or extend the component if needed.
- The YouTube `<iframe>` inside the modal uses `allowfullscreen`, which is appropriate for embedded video content.

## Related Components
- [`card`](/docs/components/ui/card.md) — base card wrapper used for the content section
- [`modal`](/docs/components/ui/modal.md) — full-screen video overlay
- [`button`](/docs/components/ui/button.md) — action buttons rendered below the text
- [`icon`](/docs/components/ui/icon.md) — play arrow icon overlaid on video thumbnails
