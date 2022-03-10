<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import Icon from '../icon/Icon.vue'
import Spinner from '../spinner/Spinner.vue'

const props = defineProps<{
	id?: string
	label?: string
	labelInfo?: string
	float?: boolean
	leadingIcon?: string
	trailingIcon?: string
	trailingText?: string
	loading?: boolean
	disabled?: boolean
	autofocus?: boolean
	size?: number | string
	last?: boolean
	state?: string
	invalidFeedback?: string
}>()

const elementRef = ref<Element>()
const input = elementRef.value?.querySelector('.form-control')
const uid = ref(props.id || `__VID__${getCurrentInstance()?.uid}`)

onMounted(() => {
	nextTick(() => {
		if (props.autofocus) {
			document.getElementById(uid.value)?.focus()
		}

		if (props.float) {
			if (input) {
				input.setAttribute('placeholder', ' ')
			}
		}

		if (input) {
			input.setAttribute('id', uid.value)
		}
	})
})

const classList = computed(() => {
	const list = ['ui-form-wrapper']

	if (props.leadingIcon) {
		list.push('-with-leading-icon')
	}

	if (props.trailingIcon) {
		list.push('-with-trailing-icon')
	}

	if (props.trailingText) {
		list.push('-with-trailing-icon')
	}

	if (props.loading) {
		list.push('-loading')
	}

	if (props.last) {
		list.push('-last')
	}

	if (props.disabled || props.loading) {
		list.push('-disabled')
	}

	if (props.float) {
		list.push('-float')
	}

	if (props.size) {
		list.push(`-${props.size}`)
	}

	if (props.state === true) {
		list.push('-valid')
	}

	if (props.state === false) {
		list.push('-invalid')
	}

	return list
})
</script>

<template>
	<div ref="refElement" :class="classList">
		<div class="form-wrapper-label" v-if="!float && label">
			<label class="form-control-label" :for="uid" v-html="label"></label>
			<span v-if="labelInfo" v-tooltip:top="labelInfo" class="form-wrapper-label-icon">
				<icon name="help" class="icon" />
			</span>
		</div>
		<div class="form-wrapper-content-item form-wrapper-content-bx">
			<icon :name="leadingIcon" v-if="leadingIcon" />
			<slot />

			<div class="form-wrapper-noteched">
				<div class="form-wrapper-noteched-prepend"></div>
				<div class="form-wrapper-noteched-label" v-if="float">
					<label class="form-wrapper-label" :for="uid" v-html="label"></label>
				</div>
				<div class="form-wrapper-noteched-append"></div>
			</div>

			<div class="trailing-icon">
				<icon name="check" v-if="state === true" />
			</div>

			<div class="trailing-icon">
				<icon :name="trailingIcon" v-if="trailingIcon && !loading" />
				<span class="trailing-icon-text" v-if="trailingText">{{ trailingText }}</span>
				<slot name="trailingIcon" />
			</div>

			<div class="form-control-loader" v-if="loading">
				<spinner class="form-control-loader-spinner" />
			</div>
		</div>

		<div class="form-invalid-feedback" v-if="state === false && invalidFeedback">
			{{ invalidFeedback }}
		</div>
	</div>
</template>

<style lang="scss">
@import './FormWrapper.scss';
</style>
