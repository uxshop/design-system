# Icon Component

## Purpose
SVG icon renderer. Displays icons from design system icon library with customizable size, color, and rotation.

## Usage Examples

### Basic Icon
\`\`\`vue
<template>
  <Icon name="home" />
</template>

<script setup>
import { Icon } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Icon with Color
\`\`\`vue
<template>
  <div class="flex gap-4">
    <Icon name="star" size="lg" />
    <Icon name="heart" size="lg" />
  </div>
</template>
\`\`\`

## Styling
Inline SVG element. Size controlled by size prop (sm, md, lg, xl) or explicit size. Color inherited from parent or set via color prop. Rotation and animation via CSS.

## A11y Notes
Icon is decorative by default (aria-hidden='true'). If icon conveys meaning, use aria-label on parent element. Always pair icon with text in critical interactions (buttons, links).

## Related Components
- [IconButton](#icon-button) — Clickable icon
- [Button](#button) — Icon + text button
