# Home Bar Component

## Purpose
Welcome/greeting bar typically shown at the top of the admin home page or inside the sidebar. Displays a personalised greeting ("Olá, {userName}!") or a custom message string, followed by optional content via the `content` slot (e.g., quick stats or shortcut buttons).

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { HomeBar } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| userName | string | No | — | Renders "Olá, {userName}!" as the heading; takes precedence over `message` |
| message | string | No | — | Custom message text rendered as the heading when `userName` is not set |

## Slots

| Slot | Description |
|------|-------------|
| content | Additional content rendered below the greeting heading (e.g., stats, shortcuts) |

## Usage Examples

### Greeting with user name
```vue
<script setup lang="ts">
import { HomeBar } from '@tray-tecnologia/design-system';
</script>

<template>
  <HomeBar user-name="Maria" />
  <!-- renders: Olá, Maria! -->
</template>
```

### Custom message with slot content
```vue
<template>
  <HomeBar message="Welcome back">
    <template #content>
      <StatsGroup :items="quickStats" />
    </template>
  </HomeBar>
</template>
```

## Styling
- Root class: `home-bar`; heading class: `home-bar-title`.
- Styles are in `HomeBar.scss`; customise via CSS custom properties or a wrapping class.

## A11y Notes
- The greeting is rendered as an `<h5>`; ensure it fits the heading hierarchy of the page it's placed on.
- Both `userName` and `message` are mutually exclusive visually; only the first truthy value renders.

## Related Components
- [`Sidebar`](./sidebar.md) — `HomeBar` is often placed in the `top-content` slot of the sidebar
- [`StatsGroup`](./stats-group.md) — commonly used inside the `content` slot
