# Panel Skeleton Component

## Purpose
A full-panel loading skeleton that mimics the admin panel layout (sidebar + main content area) while data is being fetched. Displays animated `Skeleton` placeholders for the logo, navigation tabs, menu items, sidebar footer, and the main content rows. Automatically fades out with a configurable delay after loading completes.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { PanelSkeleton } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| logoImage | string | Yes | — | URL of the logo image passed to the internal `SidebarHeader` component. |
| isLoading | boolean | Yes | — | Controls skeleton visibility. `true` shows the skeleton; `false` triggers the fade-out transition after the configured delay. |
| delayMiliseconds | number | No | `1` | Duration in milliseconds to wait before hiding the skeleton after `isLoading` becomes `false`. Useful to prevent a flash when loading resolves very quickly. |

## Usage Examples

### Basic usage with an async data load
```vue
<script setup lang="ts">
import { PanelSkeleton } from '@tray-tecnologia/design-system';
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(async () => {
  await fetchInitialData();
  isLoading.value = false;
});
</script>

<template>
  <PanelSkeleton
    logo-image="/assets/logo.svg"
    :is-loading="isLoading"
    :delay-miliseconds="300" />

  <MainLayout v-if="!isLoading" />
</template>
```

### With a longer fade-out delay
```vue
<template>
  <PanelSkeleton
    logo-image="/assets/logo.svg"
    :is-loading="appLoading"
    :delay-miliseconds="600" />
</template>
```

## Styling
- Root element uses the class `panel-skeleton-container`, with `-show` applied while `isLoading` is true.
- The CSS `transition` duration is driven by the `delayMiliseconds` prop via a `v-bind` in the `<style>` block, creating a smooth fade.
- Internal layout mirrors the admin panel: `sidebar` and `panel-content` divs with skeleton rows.

## A11y Notes
- The skeleton is purely visual; it has no ARIA live region. If you need to announce loading state to screen readers, add `aria-busy="true"` to the parent container while loading.
- The skeleton is removed from the DOM (`v-if`) after the delay, not just hidden, so it does not remain in the accessibility tree.

## Related Components
- [`skeleton`](/docs/components/ui/skeleton.md) — individual animated skeleton block used internally
- [`sidebar-header`](/docs/components/admin/sidebar-header.md) — header rendered inside the skeleton sidebar
- [`empty-data`](/docs/components/admin/empty-data.md) — shown after loading when there is no content
