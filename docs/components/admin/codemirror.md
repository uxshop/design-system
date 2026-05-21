# Codemirror Component

## Purpose
A Vue 3 wrapper around the [CodeMirror 6](https://codemirror.net/) editor library. It provides a full-featured code editor with syntax highlighting (CSS, HTML, and JavaScript auto-detection), undo/redo history, tab-key indentation, and two-way binding via `v-model`. The language is detected automatically: content that starts with `<` is treated as HTML, everything else as JavaScript/CSS. Use this component wherever users need to edit raw code or markup in the admin UI.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Codemirror } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| modelValue | string | No | - | The current editor content. Use with `v-model` for two-way binding. |
| config | object | No | - | Reserved for future CodeMirror extension configuration (not yet consumed by the component). |

## Events

- `@update:modelValue` — Emitted whenever the editor content changes. Carries the full document string as the payload.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Codemirror } from '@tray-tecnologia/design-system';

const code = ref('<div class="example">Hello world</div>');
</script>

<template>
  <!-- Two-way bound editor, HTML auto-detected -->
  <Codemirror v-model="code" />

  <!-- Read initial value, handle changes manually -->
  <Codemirror :model-value="code" @update:model-value="code = $event" />
</template>
```

## Styling
The editor inherits CodeMirror's default theme. The component applies minimal container CSS via `Codemirror.scss`. Wrap the component in a sized container to control editor height; CodeMirror will expand to fill it.

## A11y Notes
CodeMirror 6 renders a `contenteditable` region that is usable with most screen readers, but complex code navigation may be challenging. Keyboard shortcuts (standard editor commands, Tab for indentation) are enabled by default via `defaultKeymap` and `indentWithTab`.

## Related Components
- [CodeMirror 6 documentation](https://codemirror.net/docs/) — upstream library reference
- `FormTextfield` — use for simple single/multi-line text input without code-editing needs.
