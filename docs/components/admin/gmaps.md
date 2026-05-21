# Gmaps Component

## Purpose
A Google Maps Static API wrapper that renders a map image for a given postal address. It composes address fields (street, number, city, state, zip code) into a Google Maps Static API URL and displays the resulting image as a clickable link that opens Google Maps in a new tab. When `linkOnly` is `true`, only a text link ("ver no mapa") is rendered instead of the image. Address resolution is debounced by 1 second to avoid excessive API calls while the user types.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Gmaps } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| address | AddressInterface | Yes | - | Address object with `street`, `number`, `city`, `state`, and `zipcode` fields used to generate the map URL. |
| linkOnly | boolean | No | `false` | When `true`, renders only a text link to Google Maps instead of the static map image. |
| style | string | No | - | Reserved for future map style customisation (passed to the Static API style param). |
| width | string \| number | No | `720` | Width in pixels of the static map image. |
| height | string \| number | No | `360` | Height in pixels of the static map image. |
| zoom | string \| number | No | `20` | Zoom level for the static map (0–21). |

## Usage Examples

```vue
<script setup lang="ts">
import { Gmaps } from '@tray-tecnologia/design-system';

const address = {
  street: 'Rua das Flores',
  number: '123',
  city: 'São Paulo',
  state: 'SP',
  zipcode: '01310-100',
};
</script>

<template>
  <!-- Map image with clickable overlay -->
  <Gmaps :address="address" :width="640" :height="320" :zoom="17" />

  <!-- Text link only -->
  <Gmaps :address="address" link-only />
</template>
```

## Styling
The component renders a `.ui-gmaps` container with a relative-positioned image and an absolutely-positioned `.overlay` label ("Ver no Google Maps"). Size the map by adjusting `width` and `height` props rather than overriding CSS.

## A11y Notes
The map image uses `alt="Google Maps"`. The entire image is wrapped in an `<a>` with `target="_blank"`, which opens an accessible Google Maps page. The overlay text is decorative; consider adding a more descriptive `aria-label` on the link wrapper if needed.

## Related Components
- [Google Maps Static API documentation](https://developers.google.com/maps/documentation/maps-static/overview) — upstream API reference
- `Link` — used internally to render the `linkOnly` text link.
