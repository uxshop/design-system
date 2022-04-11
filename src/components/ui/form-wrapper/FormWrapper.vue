<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, useSlots } from 'vue'
import Icon from '../icon/Icon.vue'
import Spinner from '../spinner/Spinner.vue'

interface Props {
	leadingIcon?: string
	trailingIcon?: string
	labelInfo?: string
	trailingText?: string
	state?: undefined
	coutable?: boolean
	loading?: boolean
	last?: boolean
	float?: boolean
	disabled?: boolean
	invalidFeedback?: string
	autofocus?: boolean
	size?: string | number
	label?: string
	id?: string
}

const props = defineProps<Props>()
const elementRef = ref<Element>()
const uid = ref(props.id || `__VID__${getCurrentInstance()?.uid}`)
const slots = useSlots()
onMounted(() => {
	nextTick(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const input: HTMLElement[] = elementRef.value?.querySelectorAll('input, textarea, select')

		if (input && input[0]) {
			input[0].setAttribute('id', uid.value)

			if (props.autofocus) {
				input[0].focus()
			}

			if (props.float) {
				input[0].setAttribute('placeholder', ' ')
			}
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
	<div ref="elementRef" :class="classList">
		<div class="form-wrapper-label" v-if="!float && props.label">
			<label class="form-control-label" :for="uid" v-html="props.label"></label>
			<span v-if="labelInfo" v-tooltip:top="labelInfo" class="form-wrapper-label-icon">
				<Icon name="help" class="icon" />
			</span>
		</div>

		<div class="ui-form-wrapper-main">
			<div class="form-wrapper-content-item form-wrapper-content-bx">
				<Icon :name="leadingIcon" v-if="leadingIcon" />
				<slot />

				<div class="form-wrapper-noteched">
					<div class="form-wrapper-noteched-prepend"></div>
					<div class="form-wrapper-noteched-label" v-if="float">
						<label class="form-wrapper-label" :for="uid" v-html="props.label"></label>
					</div>
					<div class="form-wrapper-noteched-append"></div>
				</div>

				<div class="trailing-icon">
					<Icon name="check" v-if="state === true" />
				</div>

				<div class="trailing-icon">
					<Icon :name="trailingIcon" v-if="trailingIcon && !loading" />
					<span class="trailing-icon-text" v-if="trailingText">{{ trailingText }}</span>
					<slot name="trailingIcon" />
				</div>

				<div class="form-control-loader" v-if="loading">
					<Spinner class="form-control-loader-spinner" />
				</div>
			</div>
			<div class="form-wrapper-append" v-if="slots.append">
				<slot name="append" />
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
