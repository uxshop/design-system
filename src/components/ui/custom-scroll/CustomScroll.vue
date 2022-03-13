<script setup lang="ts">
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { getCurrentInstance, onMounted } from 'vue'

const props = defineProps<{
	settings?: PerfectScrollbar.Options
}>()

const uid = `perfect-scroll-${getCurrentInstance()?.uid}`
const config: PerfectScrollbar.Options = {
	...{
		// handlers?: string[];
		// maxScrollbarLength?: number;
		// minScrollbarLength?: number;
		// scrollingThreshold?: number;
		// scrollXMarginOffset?: number;
		// scrollYMarginOffset?: number;
		// suppressScrollX?: boolean;
		// suppressScrollY?: boolean;
		// swipeEasing?: boolean;
		// useBothWheelAxes?: boolean;
		// wheelPropagation?: boolean;
		// wheelSpeed?: number;
	},
	...props.settings
}

onMounted(() => {
	new PerfectScrollbar(`#${uid}`, config)
})
</script>

<template>
	<div class="perfect-scroll" :id="uid">
		<slot />
	</div>
</template>

<style lang="scss">
@import './CustomScroll.scss';
</style>
