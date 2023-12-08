<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import Icon from '../icon/Icon.vue'
import type { Variant } from '../../../types/Types'

interface ToastProps {
	className?: string
	closeable?: boolean
	duration?: number
	id?: string
	message?: string
	variant?: Variant
}

interface StateInterface {
	option: Record<string, string>
	timer: ReturnType<typeof setTimeout> | null
	showing: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
	duration: 2000,
	variant: 'default'
})

const closed = ref(false)
const state = reactive<StateInterface>({
	option: {},
	showing: false,
	timer: null
})

const toastClassList = computed(() => {
	let classes = []

	if (props.variant) {
		classes.push(`-variant-${props.variant}`)
	}

	return classes
})

const close = () => {
	closed.value = true
	state.timer = null
	state.showing = false
	toastClassList.value.push('-leave')
	setTimeout(() => {
		if (props.id) {
			const ele = document.getElementById(props.id)
			if (ele) {
				document.body.removeChild(ele)
			}
		}
	}, 300)
}

onMounted(() => {
	startTimer()
	state.showing = true
})

const startTimer = () => {
	if (props.duration > 0) {
		state.timer = setTimeout(() => {
			if (!closed.value) {
				close()
			}
		}, props.duration)
	}
}
</script>

<template>
	<div class="ui-toast" :class="toastClassList">
		<div class="ui-toast-body">
			<div v-html="message" />
		</div>
		<Icon v-if="closeable" class="ui-toast-close" name="close" @click="close" />
	</div>
</template>

<style lang="scss">
@import './Toast.scss';
</style>
