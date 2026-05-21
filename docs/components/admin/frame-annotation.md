# Frame Annotation Component

## Purpose
A deprecated layout wrapper that places a `CardAnnotation` label panel on the left (4 columns) alongside a content area on the right (8 columns). It is intended for forms or sections that need a contextual description beside their content. New code should build this layout directly using `Row`, `Col`, and `CardAnnotation` instead.

> **Deprecated** — This component is marked deprecated and will be removed in a future release.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FrameAnnotation } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | - | Title text displayed at the top of the left-side `CardAnnotation` panel. |
| annotation | string | No | - | Description text displayed inside the annotation panel. Overridden by the `annotation` slot if provided. |

## Slots

| Slot | Description |
|------|-------------|
| annotation | Custom content for the annotation panel, replacing the `annotation` prop text. |
| default | Main content rendered in the right-hand 8-column area. |

## Usage Examples

```vue
<script setup lang="ts">
import { FrameAnnotation } from '@tray-tecnologia/design-system';
</script>

<template>
  <!-- Prop-based annotation -->
  <FrameAnnotation title="Informações básicas" annotation="Preencha os dados principais do produto.">
    <FormTextfield label="Nome do produto" />
  </FrameAnnotation>

  <!-- Slot-based annotation with richer content -->
  <FrameAnnotation title="Imagens">
    <template #annotation>
      <p>Envie até 10 imagens. Formatos aceitos: JPG, PNG.</p>
    </template>
    <ImageUploader />
  </FrameAnnotation>
</template>
```

## Styling
Uses a 4/8 column split via `Row`/`Col`. On small screens (`sm`) both columns expand to 12 columns and stack vertically. The left panel has `pr-4` padding applied internally.

## A11y Notes
The annotation panel is purely visual context. Ensure the main content slot contains properly labelled form controls. No ARIA roles are added by the wrapper itself.

## Related Components
- `CardAnnotation` — the annotation panel rendered on the left
- `Row` / `Col` — grid primitives used for the internal layout
