# Rating Star Component

## Purpose
5-star rating input/display. Users click to rate, or display existing rating. Supports half-star ratings.

## Usage Examples

### Interactive Rating
\`\`\`vue
<template>
  <RatingStar
    v-model="userRating"
    label="Rate this product"
  />
</template>

<script setup>
import { RatingStar } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Read-only Display
\`\`\`vue
<template>
  <RatingStar
    :model-value="productRating"
    readonly
    label="Customer rating: 4.5/5"
  />
</template>
\`\`\`

## Styling
5 stars in a row. Empty star outline by default. Filled star on hover/selection. Half-star support optional. Star size adjustable (sm, md, lg).

## A11y Notes
Each star is a button with aria-label (e.g., '3 out of 5 stars'). Keyboard: Arrow Left/Right changes rating. Screen reader announces rating changes.

## Related Components
- [Badge](#badge) — Small label
- [Feedback Message](#feedback-message) — User feedback
