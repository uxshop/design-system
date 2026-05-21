# Page Component

## Purpose
Page-level container that wires together a `Titlebar`, optional help resources (video and articles), page content, and a footer support message into a cohesive page layout. Accepts title, back-link, and primary/secondary action definitions via props and delegates rendering to `Titlebar`. Pass `hideTitle` to suppress the title bar entirely. The `size` prop controls the max-width of the content area.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Page } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| hideTitle | boolean | No | false | When `true`, the `Titlebar` is not rendered |
| primaryAction | ActionButton | No | — | Primary CTA shown in the title bar (highlighted button) |
| secondaryActions | ActionButton[] | No | — | Secondary actions; shown as a single button or collapsed into a dropdown |
| to | Record<string, any> | No | — | Router target for the page (passed to Titlebar) |
| backlink | { to: string } | No | — | When provided, renders a back arrow button linking to the named route |
| size | `'sm' \| 'md' \| 'lg' \| 'full'` | No | — | Controls the max-width class applied to the page wrapper |
| title | string | No | — | Page heading text rendered in the Titlebar |
| videoHelp | IVideo | No | — | Embeds a help video panel below the title bar |
| articlesHelp | IArticle[] | No | — | List of help articles to display alongside the video panel |
| footerHelp | object | No | — | Renders a `PageMessageSupport` footer with a name and link |
| groupActions | { name: string; actions: ActionButton[] } | No | — | Grouped action buttons in the title bar |

## Slots

| Slot | Description |
|------|-------------|
| titlebar-subtitle | Optional subtitle rendered below the page title inside the Titlebar |
| default | Main page body content |

## Usage Examples

### Basic page with title and primary action
```vue
<script setup lang="ts">
import { Page } from '@tray-tecnologia/design-system';

const primaryAction = {
  label: 'New item',
  onAction: () => console.log('create'),
};
</script>

<template>
  <Page title="My Page" :primary-action="primaryAction">
    <p>Page content goes here.</p>
  </Page>
</template>
```

### Page with back link and secondary actions
```vue
<template>
  <Page
    title="Edit Settings"
    :backlink="{ to: 'settings' }"
    :secondary-actions="[{ label: 'Export', onAction: exportFn }]"
    :primary-action="{ label: 'Save', onAction: saveFn }">
    <SettingsForm />
  </Page>
</template>
```

### Page without title bar
```vue
<template>
  <Page hide-title>
    <CustomHeader />
    <PageContent />
  </Page>
</template>
```

## Styling
- Root element class: `ui-page`; size modifier classes: `-sm`, `-md`, `-lg`, `-full`.
- Styles live in `Page.scss`; max-width constraints are applied via the size modifier.
- The help video panel uses class `ui-page-help`.

## A11y Notes
- The `Titlebar` renders the page title as an `<h2>`; do not add another `<h1>` or `<h2>` inside the default slot.
- Back-link button includes a visible label (`arrow_back` icon + text via `Titlebar`).

## Related Components
- [`Titlebar`](./titlebar.md) — rendered internally when `hideTitle` is false
- [`Layout`](./layout.md) — outer shell that hosts the router-view where `Page` is rendered
- [`Savebar`](./savebar.md) — floating save bar used alongside pages with editable forms
- [`PageMessageSupport`](./page-message-support.md) — footer help block rendered when `footerHelp` is set
