<script setup lang="ts">
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { getCurrentInstance, onMounted } from 'vue'
const uid = `perfect-scroll-${getCurrentInstance()?.uid}`
const props = defineProps<{
	settings: PerfectScrollbar.Options
}>()

const config = {
	...{
		// wheelSpeed: 2,
		// wheelPropagation: true,
		// minScrollbarLength: 20
	},
	...props.settings
}

onMounted(() => {
	const ps = new PerfectScrollbar(`#${uid}`, config)
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
