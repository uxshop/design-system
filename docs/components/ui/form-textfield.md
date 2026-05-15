# Form Textfield Component

## Purpose
Single-line text input for names, email, URLs, etc. Supports multiple input types (text, email, password, url, tel).

## Usage Examples

### Email Input
\`\`\`vue
<template>
  <FormTextfield
    v-model="email"
    type="email"
    label="Email"
    placeholder="user@example.com"
  />
</template>

<script setup>
import { FormTextfield } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Password Input
\`\`\`vue
<template>
  <FormTextfield
    v-model="password"
    type="password"
    label="Password"
  />
</template>
\`\`\`

## Styling
Single-line input box with optional icons (leading, trailing). Rounded corners. Blue border on focus. Placeholder text in light gray. Disabled state appears grayed out.

## A11y Notes
Input element with proper type attribute. Label associated via for/id. aria-invalid if validation error. aria-describedby for helper text. Autocomplete supported.

## Related Components
- [FormTextarea](#form-textarea) — Multi-line input
- [FormHelper](#form-helper) — Helper text
