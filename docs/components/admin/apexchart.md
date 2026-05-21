# Apexchart Component

## Purpose
A thin Vue 3 wrapper around the [ApexCharts](https://apexcharts.com/) library. It mounts an ApexCharts instance on `onMounted`, exposes chart type, height, and series as reactive props, and automatically calls `updateSeries` whenever the `series` prop changes. Use it to render line, bar, pie, donut, area, radar, heatmap, candlestick, and other chart types inside admin pages.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Apexchart } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| options | ApexCharts.ApexOptions | No | - | Full ApexCharts configuration object. Merged with the defaults set by the wrapper. |
| series | any[] | Yes | - | Chart series data. Passed directly to ApexCharts and watched for reactive updates via `updateSeries`. |
| height | string | No | `'auto'` | CSS height of the chart container (e.g. `'350px'`). |
| type | string | Yes | `'line'` | Chart type. Accepted values: `line`, `area`, `bar`, `pie`, `donut`, `radialBar`, `scatter`, `bubble`, `heatmap`, `candlestick`, `boxPlot`, `radar`, `polarArea`, `rangeBar`, `rangeArea`, `treemap`. |

## Usage Examples

```vue
<script setup lang="ts">
import { Apexchart } from '@tray-tecnologia/design-system';

const series = [{ name: 'Sales', data: [10, 41, 35, 51, 49, 62, 69] }];
const options = {
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
};
</script>

<template>
  <!-- Line chart -->
  <Apexchart type="line" height="350" :series="series" :options="options" />

  <!-- Donut chart -->
  <Apexchart
    type="donut"
    :series="[44, 55, 13, 33]"
    :options="{ labels: ['A', 'B', 'C', 'D'] }" />
</template>
```

## Styling
The wrapper renders a single `<div>` and delegates all visual styling to ApexCharts itself. Custom CSS variables and theme tokens are not applied automatically — pass theme colors via the `options.theme` or `options.colors` ApexCharts properties. The SCSS file (`Apexchart.scss`) only handles minimal container resets.

## A11y Notes
ApexCharts generates SVG output which is not natively screen-reader friendly. For critical data, supplement the chart with a visible data table or `aria-label` on the wrapping element. The component does not add ARIA roles itself.

## Related Components
- [ApexCharts documentation](https://apexcharts.com/docs/installation/) — upstream library reference
- No direct design-system siblings; for simple progress indicators prefer `ProgressBar`.
