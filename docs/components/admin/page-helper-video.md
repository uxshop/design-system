# Page Helper Video Component

## Purpose
A composite help component that renders a clickable "Precisa de ajuda?" banner with a play-circle icon. When clicked it opens a small `Aside` drawer containing an embedded YouTube video (via `YoutubePlayer`) and an optional list of related knowledge-base article links. Use it when a tutorial video is the primary help resource for a page.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { PageHelperVideo } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| video | IVideo | Yes | - | Object describing the video to display: `{ video_id: string; name?: string; articles?: { name: string; url: string }[] }`. The `video_id` is the YouTube video ID. If `video_id` is falsy the banner is hidden entirely. |

## Usage Examples

```vue
<script setup lang="ts">
import { PageHelperVideo } from '@tray-tecnologia/design-system';

const helpVideo = {
  video_id: 'dQw4w9WgXcQ',
  name: 'Configurar formas de pagamento',
  articles: [
    { name: 'Documentação de pagamentos', url: 'https://help.tray.com.br/pagamentos' },
  ],
};
</script>

<template>
  <PageHelperVideo :video="helpVideo" />
</template>
```

### Without articles

```vue
<template>
  <PageHelperVideo :video="{ video_id: 'abc123', name: 'Tour pela loja' }" />
</template>
```

## Styling
- The banner inherits the `PageHelper` visual style (border, hover background, icon color).
- The video inside the drawer is rendered in a 16:9 responsive wrapper (`padding-bottom: 56.25%`).
- The YouTube iframe has `--s-border-radius-small` applied.
- Article links below the video follow the same separator pattern as `PageHelperArticles`.

## A11y Notes
- The banner `<div>` is clickable but not a semantic button; add `role="button"` and keyboard handling if needed.
- The play-circle icon is decorative — it should carry `aria-hidden="true"`.
- The `YoutubePlayer` renders a standard `<iframe>`; provide a meaningful `title` at the iframe level if customising the player directly.
- The drawer (Aside) handles focus trapping when open.

## Related Components
- [`PageHelper`](./page-helper.md) — base banner component used as the trigger here.
- [`PageHelperArticles`](./page-helper-articles.md) — same drawer pattern but shows article links instead of a video.
- [`PageMessageSupport`](./page-message-support.md) — lightweight inline support link without a drawer.
