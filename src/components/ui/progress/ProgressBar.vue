<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
	height?: string | number
	value?: string | number
	max?: string | number
}

const props = withDefaults(defineProps<Props>(), {
	height: '3px'
})
</script>

<template>
	<progress class="ui-progress-bar" :value="value" :max="max" />
</template>

<style lang="scss">
.ui-progress-bar {
	height: v-bind(height);
}
@import './ProgressBar.scss';
</style>
