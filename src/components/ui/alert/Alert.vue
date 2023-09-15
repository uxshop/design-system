<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import Icon from '../icon/Icon.vue'
const props = defineProps<{
	title?: string
	variant?: string
	icon?: string
	dismissible?: boolean
	show: boolean
	center?: boolean
	label?: string
}>()
const emit = defineEmits(['dismissed'])
const classList = ref<string[]>([])
const open = ref(props.show)

const currentIcon = ref(props.icon)

const iconsByVariant: Record<string, string> = {
	success: 'check_circle',
	danger: 'error',
	warning: 'warning'
}

const close = () => {
	open.value = false
	emit('dismissed')
}

if (props.center) {
	classList.value.push(`-center`)
}

if (props.dismissible) {
	classList.value.push(`-dismissible`)
}

function handleIconByVariant() {
	if (props.variant) {
		classList.value.push(`-${props.variant}`)
	}

	if (!currentIcon.value && props.variant) {
		currentIcon.value = iconsByVariant[props.variant]
	}
}

watchEffect(() => {
	open.value = props.show
	handleIconByVariant()
})
</script>
<template>
	<div v-if="open" class="ui-alert" :class="classList">
		<Icon v-if="currentIcon" class="ui-alert-icon" filled :name="currentIcon" />
		<div class="ui-alert-content">
			<h6 class="ui-alert-title" v-if="title">
				{{ title }}
			</h6>
			<div class="ui-alert-text">
				<slot>{{ label }}</slot>
			</div>
		</div>
		<button v-if="dismissible" type="button" class="ui-alert-close" @click="close">
			<Icon name="close" />
		</button>
	</div>
</template>

<style lang="scss">
@import './Alert.scss';
</style>
