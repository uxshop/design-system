<script setup lang="ts">
import { ref } from 'vue'

interface Props {
	height: string | number
}

const props = withDefaults(defineProps<Props>(), {
	height: 3
})
const style = ref<{
	height?: string
}>({})

style.value.height = `${props.height}px`
</script>

<template>
	<progress class="ui-progress" :style="style" />
</template>

<style lang="scss">
@import './Progress.scss';
</style>
