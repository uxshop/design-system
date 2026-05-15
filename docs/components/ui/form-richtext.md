# Form Richtext Component

## Purpose
WYSIWYG text editor for rich content. Supports formatting (bold, italic, lists, links, images) in a toolbar-based interface.

## Usage Examples

### Basic Rich Text Editor
\`\`\`vue
<template>
  <FormRichtext
    v-model="content"
    placeholder="Enter your message..."
  />
</template>

<script setup>
import { FormRichtext } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Toolbar Customization
\`\`\`vue
<template>
  <FormRichtext
    v-model="bio"
    height="200px"
  />
</template>
\`\`\`

## Styling
Textarea-like input with formatting toolbar above. Formatting buttons (bold, italic, underline, link, etc). Content display area shows formatted text. Optional height customization.

## A11y Notes
Editor should be keyboard accessible. Formatting shortcuts (Ctrl+B for bold). Content should maintain semantic HTML. Use role='application' for editor itself. Alt text for images.

## Related Components
- [FormTextarea](#form-textarea) — Plain text area
- [FormTextfield](#form-textfield) — Single-line input
