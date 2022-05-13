<script setup lang="ts">
import apexcharts from 'apexcharts/src/apexcharts.js'
import type ApexCharts from 'apexcharts'
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue'

export interface Props {
	options?: ApexCharts.ApexOptions
	series: any[]
	height?: string
	type:
		| 'line'
		| 'area'
		| 'bar'
		| 'histogram'
		| 'pie'
		| 'donut'
		| 'radialBar'
		| 'scatter'
		| 'bubble'
		| 'heatmap'
		| 'candlestick'
		| 'boxPlot'
		| 'radar'
		| 'polarArea'
		| 'rangeBar'
		| 'treemap'
}

const props = withDefaults(defineProps<Props>(), {
	default: 'line',
	height: 'auto'
})
const uid = `apex-${getCurrentInstance()?.uid}`

const settings = ref<ApexCharts.ApexOptions>({
	...{
		chart: {
			type: props.type
		},
		series: [
			{
				data: []
			}
		]
	},
	...props.options
})

const chart = shallowRef()

watchEffect(() => {
	if (settings.value.chart) {
		settings.value.chart.type = props.type
		settings.value.chart.height = props.height
	}

	if (chart.value) {
		chart.value.updateSeries(props.series)
	}
})

onMounted(() => {
	chart.value = new apexcharts(document.querySelector(`#${uid}`), settings.value)
	chart.value.render()
})
</script>

<template>
	<div :id="uid"></div>
</template>

<style lang="scss">
@import './Apexchart.scss';
</style>
