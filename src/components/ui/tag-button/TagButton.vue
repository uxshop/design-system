<script setup lang="ts">
import Icon from '../icon/Icon.vue'
import { ref } from 'vue'

defineProps<{
	variant: string
	size: string
}>()

const emit = defineEmits(['remove'])

const classList = ref<string[]>([])

const onRemove = () => {
	emit('remove')
}
</script>

<template>
	<span class="ui-tag-button" :class="classList">
		<slot />
		<Icon name="close" class="ui-tag-button-close" @click="onRemove" />
	</span>
</template>

<style lang="scss">
@import './TagButton.scss';
</style>
