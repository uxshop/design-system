# Content 403 Component

## Purpose
A full-page error screen for HTTP 403 Forbidden responses. This is not a reusable primitive — it is a page-level component intended to replace the main content area when the current user lacks permission to view a resource. On mount it adds a `forbidden` class to `document.body` (and removes it on unmount) so that the shell layout can apply special styling. Optionally displays the account owner's email address so the user knows who to contact.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Content403 } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| owner | `{ email?: string }` | No | `{}` | Owner object. When `email` is provided it is shown in the permission-denied message so the user knows who to contact.

## Usage Examples

```vue
<script setup lang="ts">
import { Content403 } from '@tray-tecnologia/design-system';
</script>

<template>
  <!-- Without owner contact -->
  <Content403 />

  <!-- With account owner email -->
  <Content403 :owner="{ email: 'admin@minha-loja.com.br' }" />
</template>
```

## Styling
Styled via `Content403.scss`. The `.content-403` root and `.empty-center`/`.empty-info` classes center the message on the page. The body `forbidden` class can be used in the app shell to hide navigation chrome while the error is displayed.

## A11y Notes
The error message is plain text inside a `<div>`. Wrap with a `role="main"` or `<main>` element in the router view so screen readers announce the page correctly. The highlighted email address uses `.text-primary` for color only — it is not a link.

## Related Components
- `Content404` — companion page-level component for 404 Not Found errors
