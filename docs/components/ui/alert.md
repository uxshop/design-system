# Alert Component

## Purpose
Displays contextual messages with optional dismiss action. Supports variants (success, warning, error, info) for different message types.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Alert } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | - | [TODO: Add description] |
| variant | AlertVariant | No | - | [TODO: Add description] |
| icon | string | No | - | [TODO: Add description] |
| dismissible | boolean | No | - | [TODO: Add description] |
| show | boolean | No | - | [TODO: Add description] |
| label | string | No | - | Texto para o conteúdo do alerta, que é opcional, porém quando não passado como prop deve ser usado o... |

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Events

- `@dismissed` — [TODO: Add description]

## Usage Examples

### Basic Alert
```vue
<template>
  <Alert variant="info" label="This is an informational message" />
</template>

<script setup>
import { Alert } from '@tray-tecnologia/design-system';
</script>
```

### Dismissible Alert with Variant
```vue
<template>
  <Alert
    variant="warning"
    title="Warning"
    label="Check your input before submitting"
    dismissible
    @dismissed="handleDismiss"
  />
</template>
```

### Alert in a Form
```vue
<template>
  <div>
    <Alert
      v-if="submitted"
      variant="success"
      label="Changes saved successfully!"
    />
    <Form @submit="handleSubmit" />
  </div>
</template>
```

## Styling
Alert uses the `variant` prop to apply semantic colors (green for success, red for error, orange for warning, blue for info). Dismissible state can be styled with the `.is-dismissed` class. Icon slot allows for custom icons.

## A11y Notes
Alert role is applied automatically. Messages should be concise. Icon slot is recommended for better accessibility (use aria-label if icon is decorative). Close button has aria-label='Dismiss' by default.

## Related Components
- [Toast](#toast) — Similar for temporary notifications
- [Feedback Message](#feedback-message) — For transient messages
- [Callout Card](#callout-card) — For highlighted information blocks
