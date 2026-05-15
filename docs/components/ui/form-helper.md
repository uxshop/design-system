# Form Helper Component

## Purpose
Helper text displayed below form inputs. Shows hints, validation messages, or constraints (e.g., "Min 8 characters").

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormHelper } from '@tray-tecnologia/design-system';
```

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Usage Examples

### Hint Text
\`\`\`vue
<template>
  <FormHelper text="Use at least 8 characters" />
</template>

<script setup>
import { FormHelper } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Error Message
\`\`\`vue
<template>
  <FormHelper
    text="Email is invalid"
    variant="error"
  />
</template>
\`\`\`

## Styling
Small gray text below input. Color matches variant (red for error, green for success, gray for hint). Icon displayed before text (optional).

## A11y Notes
Helper text associated with input via aria-describedby. Error helpers should be announced. Hint text is optional but recommended for accessibility.

## Related Components
- [FormLabel](#form-label) — Input labels
- [FormValidation](#form-validation) — Validation messages
