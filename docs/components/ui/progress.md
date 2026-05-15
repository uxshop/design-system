# Progress Component

## Purpose
Determinate progress bar showing completion percentage. Used for file uploads, form steps, task progress.

## Usage Examples

### Basic Progress Bar
\`\`\`vue
<template>
  <Progress :value="65" />
</template>

<script setup>
import { Progress } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Label
\`\`\`vue
<template>
  <Progress
    :value="documentProgress"
    label="Document Complete"
  />
</template>
\`\`\`

## Styling
Horizontal bar with background (light gray) and filled portion (blue). Rounded corners. Height medium (~6px). Percentage label inside or above bar.

## A11y Notes
Progress has role='progressbar'. aria-valuenow, aria-valuemin, aria-valuemax set. aria-label describes what's being measured. Status update announced as value changes.

## Related Components
- [Progress Indeterminate](#progress-indeterminate) — Activity indicator
- [Spinner](#spinner) — Loading spinner
