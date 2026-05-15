# Toast Component

## Purpose
Non-modal notification appearing at edge of screen (usually bottom-right). Auto-dismisses after timeout. Stacked if multiple toasts.

## Usage Examples

### Success Toast
\`\`\`vue
<template>
  <Toast variant="success" message="File uploaded successfully" />
</template>

<script setup>
import { Toast } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Action Button
\`\`\`vue
<template>
  <Toast
    variant="info"
    message="New message from John"
    @action="viewMessage"
  />
</template>
\`\`\`

## Styling
Fixed position notification box (usually bottom-right). Background color matches variant. Rounded corners. Small close button (X) in corner. Fade-in/fade-out animation.

## A11y Notes
Toast announced with aria-live='assertive'. Auto-dismiss respects prefers-reduced-motion. Close button keyboard accessible. Focus not moved (non-modal).

## Related Components
- [Alert](#alert) — Persistent message
- [Feedback Message](#feedback-message) — Transient notification
