# Form Textarea Component

## Purpose
Multi-line text input for longer content (comments, descriptions, feedback). Auto-expands if needed.

## Usage Examples

### Basic Textarea
\`\`\`vue
<template>
  <FormTextarea
    v-model="feedback"
    label="Feedback"
    placeholder="Tell us what you think..."
  />
</template>

<script setup>
import { FormTextarea } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Character Limit
\`\`\`vue
<template>
  <FormTextarea
    v-model="bio"
    label="Bio"
    :maxlength="500"
  />
</template>
\`\`\`

## Styling
Rectangular text input area. Resize handle (optional) in bottom-right. Character counter (optional). Placeholder text visible when empty. Border on focus.

## A11y Notes
Textarea element with proper label. aria-label if label not visible. Character limit announced. Required indicator clear. Maxlength attribute prevents overflow.

## Related Components
- [FormTextfield](#form-textfield) — Single-line input
- [FormLayout](#form-layout) — Form organization
