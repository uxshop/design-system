# Form Layout Component

## Purpose
Container for organizing form inputs vertically with consistent spacing. Handles label + input + helper grouping.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormLayout } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| group | boolean | No | - | [TODO: Add description] |

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Usage Examples

### Basic Form Layout
\`\`\`vue
<template>
  <FormLayout>
    <FormTextfield label="Name" />
    <FormTextarea label="Bio" />
    <FormCheckbox label="Subscribe" />
  </FormLayout>
</template>

<script setup>
import { FormLayout } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Two-Column Layout
\`\`\`vue
<template>
  <FormLayout columns="2" gap="lg">
    <FormTextfield label="First Name" />
    <FormTextfield label="Last Name" />
  </FormLayout>
</template>
\`\`\`

## Styling
Vertical stack of form elements. Consistent spacing between fields (gap: sm, md, lg). Optional multi-column layout. Width adapts to parent container.

## A11y Notes
Semantic HTML with proper label associations. Error states use aria-invalid. Helper text associated with inputs. Form groups have fieldset for related inputs.

## Related Components
- [Stack](#stack) — Flexible spacing
- [FormLabel](#form-label) — Input labels
