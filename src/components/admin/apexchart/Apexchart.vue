<script setup lang="ts">
import ApexCharts from 'apexcharts';
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue';
import type { ApexchartProps } from './types';

const props = withDefaults(defineProps<ApexchartProps>(), {
  type: 'line',
  height: 'auto',
});
const uid = `apex-${getCurrentInstance()?.uid}`;

const settings = ref<ApexCharts.ApexOptions>({
  chart: {
    type: props.type,
  },
  series: [
    {
      data: [],
    },
  ],
  ...props.options,
});

const chart = shallowRef();

watchEffect(() => {
  if (settings.value.chart) {
    settings.value.chart.type = props.type;
    settings.value.chart.height = props.height;
  }

  if (chart.value) {
    chart.value.updateSeries(props.series);
  }
});

onMounted(() => {
  chart.value = new ApexCharts(document.querySelector(`#${uid}`), settings.value);
  chart.value.render();
});
</script>

<template>
  <div :id="uid"></div>
</template>

<style lang="scss">
@import './Apexchart.scss';
</style>
