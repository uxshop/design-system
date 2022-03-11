<script setup lang="ts">
import ApexCharts from 'apexcharts'
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue'

interface Props {
	options: object
	series: array
	type: string
	height: string
}

const props = withDefaults(defineProps<Props>(), {
	default: 'line',
	height: 'auto'
})
const uid = `apex-${getCurrentInstance()?.uid}`

const options = ref({
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
	options.value.chart.type = props.type
	options.value.chart.height = props.height

	if (chart.value) {
		chart.value.updateSeries(props.series)
	}
})

onMounted(() => {
	chart.value = new ApexCharts(document.querySelector(`#${uid}`), options.value)
	chart.value.render()
})
</script>

<template>
	<div :id="uid"></div>
</template>

<style lang="scss">
@import './apexchart.scss';
</style>
