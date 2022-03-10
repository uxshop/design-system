<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'

interface Props {
	modelValue: undefined
	value: undefined
	label: string
	name: string
	required: boolean
	size: string
	tabindex: string | number
}

const props = withDefaults(defineProps<Props>(), {
	value: true
})

const uid = getCurrentInstance()?.uid
const checkbox = ref(null)

const emit = defineEmits(['update:modelValue'])

const update = (val: any) => {
	emit('update:modelValue', val)
}

const empty = () => {
	return !props.label || !slots.length
}
</script>

<template>
	<span>
		<label class="ui-form-radio" :for="uid">
			<input
				type="radio"
				:id="uid"
				:value="value"
				:tabindex="tabindex"
				:required="required"
				:name="name"
				v-model="modelValue"
				@update:modelValue="update"
			/>
			<div class="ui-form-radio-text">
				<slot />
				{{ label }}
			</div>
		</label>
	</span>
</template>

<style lang="scss">
@import './FormRadio.scss';
</style>
