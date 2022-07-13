<script setup lang="ts">
import Icon from '../icon/Icon.vue'
import { ref } from 'vue'

const props = defineProps<{
	variant?: string
	size?: string
	label?: string
}>()

const emit = defineEmits(['remove'])
const classList = ref<string[]>([])

const onRemove = () => {
	emit('remove')
}

if (props.variant) {
	classList.value.push(`-${props.variant}`)
}
</script>

<template>
	<span class="ui-tag mt-2 mx-1" :class="classList">
		<slot>{{ label }}</slot>
		<Icon name="close" class="ui-tag-close" @click="onRemove" />
	</span>
</template>

<style lang="scss">
@import './Tag.scss';
</style>
