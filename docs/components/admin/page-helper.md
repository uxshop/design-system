# Page Helper Component

## Purpose
A contextual help banner displayed at the top of a page or section. It shows an info icon alongside a "Precisa de ajuda?" (Need help?) prompt with the resource name highlighted. Clicking the banner either opens the provided `helperLink` in a new tab or emits an `onClickLink` event so the parent can handle navigation (e.g., opening an articles or video drawer). Used as the base trigger component for `PageHelperArticles` and `PageHelperVideo`.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { PageHelper } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| helperName | string | Yes | - | Name of the topic shown in bold inside the banner text. |
| helperLink | string | No | - | URL to open in a new tab when the banner is clicked. If omitted, only the `onClickLink` event is emitted. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| onClickLink | — | Emitted on every click, before opening `helperLink` (if present). |

## Usage Examples

```vue
<script setup lang="ts">
import { PageHelper } from '@tray-tecnologia/design-system';
</script>

<template>
  <!-- With a direct link -->
  <PageHelper
    helper-name="Configurações de loja"
    helper-link="https://help.tray.com.br/configuracoes-de-loja" />

  <!-- Handling the click programmatically -->
  <PageHelper
    helper-name="Formas de pagamento"
    @on-click-link="openHelpDrawer" />
</template>
```

## Styling
- Rendered as a flex row with `--s-spacing-nano` gap, `--s-border-light` border, and `--s-color-fill-default` background.
- The info icon uses `--s-color-content-highlight` to draw attention.
- On hover the background shifts to `--s-color-fill-default-hover` and the cursor becomes a pointer.
- Border-radius follows `--s-border-radius-small`.

## A11y Notes
- The entire banner is a clickable `<div>`; consider wrapping in a `<button>` or adding `role="button"` and `tabindex="0"` if interactive use is needed.
- The info icon is decorative — ensure `aria-hidden="true"` is present on it in consuming contexts.
- Link text is always visible ("Precisa de ajuda? Acesse o material sobre …"), providing meaningful context for screen readers.

## Related Components
- [`PageHelperArticles`](./page-helper-articles.md) — extends PageHelper to open a knowledge-base article list in a side drawer.
- [`PageHelperVideo`](./page-helper-video.md) — extends PageHelper to open an embedded YouTube video in a side drawer.
- [`PageMessageSupport`](./page-message-support.md) — inline support message with a direct knowledge-base link.
