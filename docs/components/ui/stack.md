# Stack Component

## Purpose
Flexbox layout component for stacking items vertically or horizontally. Handles spacing, alignment, and direction.

## Usage Examples

### Vertical Stack
\`\`\`vue
<template>
  <Stack gap="md">
    <FormTextfield label="Name" />
    <FormTextfield label="Email" />
    <Button label="Submit" />
  </Stack>
</template>

<script setup>
import { Stack } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Horizontal Stack
\`\`\`vue
<template>
  <Stack direction="horizontal" gap="lg" align="center">
    <Icon name="check" />
    <span>All systems operational</span>
  </Stack>
</template>
\`\`\`

## Styling
Flexbox container. Direction vertical by default. Gap between items (sm, md, lg). Align prop for alignment (start, center, end, stretch). Responsive direction possible.

## A11y Notes
Stack is presentational. Content order in DOM should match visual order. Semantic meaning of content inside Stack is preserved. Use semantic elements (Stack > Button, etc).

## Related Components
- [Grid](#grid) — Multi-column layout
- [Card](#card) — Content container
