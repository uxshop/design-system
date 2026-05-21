# Highlight Card Component

## Purpose
Visually prominent card for featured content, achievements, or CTAs. More eye-catching than standard Card.

## Usage Examples

### Feature Highlight
\`\`\`vue
<template>
  <HighlightCard title="Premium Feature">
    Unlock advanced analytics and custom reports
  </HighlightCard>
</template>

<script setup>
import { HighlightCard } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Achievement Card
\`\`\`vue
<template>
  <HighlightCard
    title="Congratulations!"
    description="You've completed your first task"
  />
</template>
\`\`\`

## Styling
Larger card with bold background color (or gradient). Large icon or image. Big, bold heading. Optional badge or ribbon. Hover effect (lift, shadow increase).

## A11y Notes
Ensure text has sufficient contrast against background. Icon is decorative or has alt text. CTA button clearly labels action. Heading hierarchy preserved.

## Related Components
- [Card](#card) — Standard container
- [Callout Card](#callout-card) — Information block
