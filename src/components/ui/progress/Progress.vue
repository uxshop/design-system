<script setup lang="ts">
import { ref } from 'vue'

interface Props {
	height?: string | number
	value?: string | number
	max?: string | number
}

const props = withDefaults(defineProps<Props>(), {
	height: 3
})
const style = ref<{
	height: string
}>({
	height: `${props.height}px`
})
</script>

<template>
	<progress class="ui-progress" :style="style" :value="value" :max="max" />
</template>

<style lang="scss">
@import './Progress.scss';
</style>
