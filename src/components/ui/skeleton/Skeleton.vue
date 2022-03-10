<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	width?: string
}>()

const style = ref<{
	width?: string
}>({})

if (props.width) {
	style.value.width = `${props.width}`
}
</script>

<template>
	<div class="ui-skeleton" :style="style"></div>
</template>

<style lang="scss">
@import './Skeleton.scss';
</style>
