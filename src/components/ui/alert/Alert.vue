<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import Icon from '../icon/Icon.vue'
const props = defineProps<{
	title: string
	variant: string
	icon: string
	dismissible: boolean
	show: boolean
}>()
const emit = defineEmits(['dismissed'])
const classList = ref<string[]>([])
const open = ref(props.show)

if (props.variant) {
	classList.value.push(`-${props.variant}`)
}

const close = () => {
	open.value = false
	emit('dismissed')
}

watchEffect(() => {
	open.value = props.show
})
</script>
<template>
	<div class="ui-alert" :class="classList" v-if="open">
		<icon name="cancel" type="rounded" v-if="variant == 'danger'" />
		<div class="ui-alert-content">
			<h6 class="ui-alert-title" v-if="title">
				{{ title }}
			</h6>
			<div class="ui-alert-text">
				<slot />
			</div>
		</div>
		<button class="ui-alert-close" v-if="dismissible" @click="close">
			<icon name="close" />
		</button>
	</div>
</template>

<style lang="scss">
@import './Alert.scss';
</style>
