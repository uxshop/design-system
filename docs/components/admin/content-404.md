# Content 404 Component

## Purpose
A full-page error screen for HTTP 404 Not Found responses. This is not a reusable primitive — it is a page-level component intended to replace the main content area when a requested route or resource does not exist. On mount it adds a `not-found` class to `document.body` (and removes it on unmount) so that the shell layout can apply special styling. The component takes no props and renders a fixed "page not found" message.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Content404 } from '@tray-tecnologia/design-system';
```

## Usage Examples

```vue
<script setup lang="ts">
import { Content404 } from '@tray-tecnologia/design-system';
</script>

<template>
  <!-- Drop in as a catch-all route component -->
  <Content404 />
</template>
```

In a Vue Router setup:
```ts
const routes = [
  // ... other routes
  { path: '/:pathMatch(.*)*', component: Content404 },
];
```

## Styling
Styled via `Content404.scss`. The `.content-404` root and `.empty-center`/`.empty-info` classes center the message on the page. The body `not-found` class can be used in the app shell to hide navigation chrome while the error is displayed.

## A11y Notes
The error message is plain text inside a `<div>`. Wrap with a `role="main"` or `<main>` element in the router view so screen readers announce the page correctly.

## Related Components
- `Content403` — companion page-level component for 403 Forbidden errors
