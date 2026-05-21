# Progress Indeterminate Component

## Purpose
Indeterminate progress indicator for unknown duration tasks (loading, processing). Shows activity without exact completion %.

## Usage Examples

### Basic Indeterminate Progress
\`\`\`vue
<template>
  <ProgressIndeterminate />
</template>

<script setup>
import { ProgressIndeterminate } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Label
\`\`\`vue
<template>
  <ProgressIndeterminate label="Loading..." />
</template>
\`\`\`

## Styling
Horizontal bar with animated stripe pattern or pulsing fill. Continuous animation. No percentage displayed.

## A11y Notes
Has role='progressbar' with aria-busy='true'. aria-label describes activity. Status announced: 'loading' or similar. Animation respects prefers-reduced-motion.

## Related Components
- [Progress](#progress) — Determinate progress
- [Spinner](#spinner) — Loading spinner
