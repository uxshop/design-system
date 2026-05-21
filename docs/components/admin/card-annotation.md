# Card Annotation Component

## Purpose
A lightweight informational callout card used to display a short annotation, tip, or warning alongside a form or content panel. Renders an optional title, a body text area (via slot), and an optional link slot for supplementary actions.

> **Deprecated** — This component is marked as deprecated and will be removed in a future version. Avoid using it in new features.

## Status
⚠️ Deprecated — Do not use in new projects

## Import
```ts
import { CardAnnotation } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | — | Optional heading displayed above the annotation text, rendered as an `<h5>`. |
| text | string | No | — | (Unused in template) — content should be passed via the default slot instead. |

## Slots

| Slot | Description |
|------|-------------|
| default | Main annotation body text. Rendered inside `.ui-card-annotation-text`. |
| link | Optional link or button placed below the body text, inside `.ui-card-annotation-link`. Only rendered when the slot is provided. |

## Usage Examples

### Basic annotation
```vue
<script setup lang="ts">
import { CardAnnotation } from '@tray-tecnologia/design-system';
</script>

<template>
  <CardAnnotation title="Atenção">
    O slug gerado automaticamente pode ser editado manualmente após a criação do registro.
  </CardAnnotation>
</template>
```

### With a link slot
```vue
<template>
  <CardAnnotation title="Dica">
    Configure as meta-tags para melhorar o SEO da sua página.
    <template #link>
      <a href="https://support.example.com/seo" target="_blank">Saiba mais</a>
    </template>
  </CardAnnotation>
</template>
```

## Styling
- Root element uses the class `ui-card-annotation`.
- Title is styled as `ui-card-annotation-title` (rendered as `<h5>`).
- Body text area uses `ui-card-annotation-text`; link area uses `ui-card-annotation-link`.
- Styles are defined in `CardAnnotation.scss`.

## A11y Notes
- The title is rendered as an `<h5>` — ensure heading hierarchy in the surrounding page is appropriate.
- Link slot content should use descriptive anchor text or `aria-label` rather than generic "click here" labels.

## Related Components
- [`card`](/docs/components/ui/card.md) — standard card wrapper for more complex content
- [`empty-data`](/docs/components/admin/empty-data.md) — empty-state callout with icon and actions
