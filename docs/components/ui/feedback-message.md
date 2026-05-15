# Feedback Message Component

## Purpose
Displays transient feedback messages (success, error, warning, info) in response to user actions. Typically auto-dismisses after a timeout.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FeedbackMessage } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | - | Define o texto principal do componente |
| subtitle | string | No | - | Define o texto secundário do componente |
| icon | IconProps | No | - | Configura o ícone do topo a ser exibido, disponibilizando todas as props do componetne Icon |
| button | ButtonProps | No | - | Configura o botão de ação do componente, disponibilizando todas as props do componente Button |
| showIcon | boolean | Yes | - | Define se o ícone será exibido |
| showButton | boolean | Yes | - | Define se o botão de ação será exibido |

## Usage Examples

### Success Feedback
\`\`\`vue
<template>
  <FeedbackMessage variant="success">
    Item saved successfully
  </FeedbackMessage>
</template>

<script setup>
import { FeedbackMessage } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Error with Custom Duration
\`\`\`vue
<template>
  <FeedbackMessage
    variant="error"
    @dismiss="handleDismiss"
  >
    Failed to save: please check your input
  </FeedbackMessage>
</template>
\`\`\`

## Styling
Message displayed in fixed area (usually top-right). Background and text color match variant. Optional icon displayed on left. Fade-out animation on dismiss.

## A11y Notes
Message announced with aria-live='polite'. Auto-dismiss respects user preference for reduced motion. Keyboard users can dismiss with Escape key or Tab to close button.

## Related Components
- [Toast](#toast) — Similar notifications
- [Alert](#alert) — Persistent messages
