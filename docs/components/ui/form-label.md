# Form Label Component

## Purpose
Label for form inputs. Associates descriptive text with form control via for attribute. Supports required and optional indicators.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormLabel } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | string | No | - | [TODO: Add description] |

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Usage Examples

### Basic Label
\`\`\`vue
<template>
  <FormLabel label="Email Address" />
</template>

<script setup>
import { FormLabel } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Required Indicator
\`\`\`vue
<template>
  <FormLabel label="Password" required />
</template>
\`\`\`

## Styling
Bold text above input. Required indicator (red asterisk) shown if required='true'. Cursor changes to pointer. Optional indicator (gray) can be shown.

## A11y Notes
Label element with for attribute matching input id. Required indicator clearly visible. Reduces cognitive load for assistive technology users.

## Related Components
- [FormHelper](#form-helper) — Helper text
- [FormLayout](#form-layout) — Form organization
