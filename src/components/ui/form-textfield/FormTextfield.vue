<script setup lang="ts">
import { ref, computed } from 'vue'
import { vMaska, type MaskOptions, type MaskType } from 'maska'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'
import type { Size, IAction } from '../../../types'

export interface Props {
	leadingIcon?: string
	trailingIcon?: string
	labelInfo?: string
	trailingText?: string
	state?: boolean
	invalidFeedback?: string
	loading?: boolean
	last?: boolean
	float?: boolean
	modelValue?: string
	label?: string
	id?: string
	placeholder?: string
	step?: string | number
	tabindex?: string
	inputmode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal'
	size?: Size
	pattern?: string
	title?: string
	name?: string
	clearable?: boolean
	autocomplete?: string
	minlength?: string | number
	maxlength?: string | number
	autofocus?: boolean
	disabled?: boolean
	required?: boolean
	readonly?: boolean
	type?: string
	mask?: MaskType
	raw?: any
	actions?: IAction[]
	max?: string | number
	min?: string | number
}

const props = withDefaults(defineProps<Props>(), {
	state: undefined
})

const emit = defineEmits<{
	(e: 'update:modelValue', val: string | null): void
	(e: 'update', val: any): void
	(e: 'focus', event: Event): void
	(e: 'blur', event: Event): void
	(e: 'keydown', event: Event): void
	(e: 'keydownEnter', event: Event): void
	(e: 'clear'): void
	(e: 'updateRaw', val: any): void
}>()

const classList = ref<string[]>([])
const maskOptions = computed<MaskOptions>(() => {
	return {
		mask: props.mask,
		eager: false
	}
})

const update = (evt: Event) => {
	const target = evt.target as HTMLInputElement
	const val = target.value
	emit('update:modelValue', val)
	emit('update', val)
}

const maskRawValue = (evt: Event) => {
	const target = evt.target as HTMLInputElement
	update(evt)
	emit('updateRaw', target.dataset.maskRawValue)
}

if (props.size) {
	classList.value.push(`-${props.size}`)
}

const onFocus = (event: Event) => {
	emit('focus', event)
}

const onBlur = (event: Event) => {
	emit('blur', event)
}

const onKeydown = (event: Event) => {
	emit('keydown', event)
}

const onEnter = (event: Event) => {
	emit('keydownEnter', event)
}

const onClear = () => {
	emit('clear')
	emit('update:modelValue', null)
	emit('update', null)
}
</script>

<template>
	<FormWrapper
		:id="id"
		:leadingIcon="leadingIcon"
		:trailingIcon="trailingIcon"
		:trailingText="trailingText"
		:label="label"
		:loading="loading"
		:last="last"
		:disabled="disabled"
		:float="float"
		:state="state"
		:labelInfo="labelInfo"
		:autofocus="autofocus"
		:size="size"
		:invalidFeedback="invalidFeedback"
		class="ui-form-textfield">
		<slot name="before" />
		<input
			v-maska:[maskOptions]
			class="form-control"
			@focus="onFocus"
			@blur="onBlur"
			@keydown="onKeydown"
			@keydown.enter="onEnter"
			@maska="maskRawValue"
			:type="type"
			:step="step"
			:value="modelValue"
			:class="classList"
			:inputmode="inputmode"
			:autocomplete="autocomplete"
			:disabled="disabled"
			:minlength="minlength"
			:maxlength="maxlength"
			:pattern="pattern"
			:autofocus="autofocus"
			:placeholder="!float ? placeholder : ''"
			:readonly="readonly"
			:tabindex="tabindex"
			:name="name"
			:title="title"
			:id="id"
			:max="max"
			:min="min"
			:required="required" />
		<slot name="after" />
		<div v-if="clearable && modelValue?.length" class="close" @click="onClear">
			<Icon name="cancel" filled size="20" />
		</div>
		<template #append v-if="$slots.append || actions">
			<div v-if="actions" class="actions">
				<Button
					v-for="item in actions"
					:key="item.label"
					:variant="item.variant"
					:type="item.type"
					:label="item.label"
					:leadingIcon="item.leadingIcon"
					@click="item.onAction" />
			</div>
			<slot name="append" />
		</template>
	</FormWrapper>
</template>
