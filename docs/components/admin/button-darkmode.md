# Button Darkmode Component

## Purpose
> **Deprecated** — This component is deprecated and will be removed in a future version. Use the `Button` component instead.

A toggle button that switches the application between light and dark color schemes. On mount it reads the stored scheme from `localStorage` (key `ds_color_scheme`) via `ColorSchemeService` and applies it to the `data-theme` attribute on `<html>`. Each click flips the scheme, persists the choice, and emits a `changeSchemeColor` event with the new value. By default it renders an `IconButton` with the appropriate icon (`dark_mode` / `light_mode`), but a custom trigger element can be provided via the default slot.

## Status
⚠️ Deprecated — Do not use in new projects. Use `Button` instead.

## Import
```ts
import { ButtonDarkmode } from '@tray-tecnologia/design-system';
```

## Slots

| Slot | Description |
|------|-------------|
| default | Custom trigger element. If omitted, a plain `IconButton` with the current mode icon is rendered. |

## Events

- `@changeSchemeColor` — Emitted after each toggle with the new `ColorScheme` value (`'dark'` or `'light'`).

## Usage Examples

```vue
<script setup lang="ts">
import { ButtonDarkmode } from '@tray-tecnologia/design-system';

function onSchemeChange(scheme: string) {
  console.log('Color scheme changed to:', scheme);
}
</script>

<template>
  <!-- Default icon button -->
  <ButtonDarkmode @changeSchemeColor="onSchemeChange" />

  <!-- Custom trigger slot -->
  <ButtonDarkmode @changeSchemeColor="onSchemeChange">
    <button>Toggle Theme</button>
  </ButtonDarkmode>
</template>
```

## Styling
- The root is a `<span>` with a click handler — no component-level class is applied.
- The built-in icon uses `IconButton` with `variant="plain"`; override via the slot for custom styling.
- The `data-theme` attribute is set on `document.documentElement`, so theme CSS variables should be scoped to `[data-theme="dark"]` and `[data-theme="light"]`.

## A11y Notes
- The default `IconButton` provides an accessible icon label; custom slot content should include its own accessible label or `aria-label`.
- No `role` or `aria-pressed` is set on the wrapper `<span>` — add these to slot content if semantic toggle semantics are required.

## Related Components
- `Button` — the recommended replacement.
- `IconButton` — used internally as the default trigger.
