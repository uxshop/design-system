<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import Icon from '../icon/Icon.vue'
import Litepicker from 'litepicker'
import moment from 'moment'

const props = defineProps<{
	modelValue: string
	config: any
	placeholder: string
	range: boolean
	noClear: boolean
	size: string
}>()

const emit = defineEmits(['update:modelValue', 'update'])

const picker = shallowRef()
const classList = shallowRef<string[]>([])
const uid = `ui-form-datepicker-${getCurrentInstance()?.uid}`
const FORMAT_DATE = 'DD/MM/YYYY'

const update = (value: null) => {
	emit('update:modelValue', value)
	emit('update', value)
}

const stopWatch = watchEffect(() => {
	if (picker.value && props.modelValue) {
		const dates = props.modelValue.split('TO')
		const date1 = moment(dates[0]).format(FORMAT_DATE)
		if (props.range && dates.length > 1) {
			const date2 = moment(dates[1]).format(FORMAT_DATE)
			console.log(date1, date2)
			picker.value.setDateRange(date1, date2)
		} else {
			picker.value.setDate(date1)
		}
	}
})

if (props.range) {
	props.config.singleMode = false
	props.config.numberOfMonths = 2
	props.config.numberOfColumns = 2
	classList.value.push('-range')
}

if (props.size) {
	classList.value.push('-sm')
}

onMounted(() => {
	picker.value = new Litepicker({
		...{
			element: document.getElementById(uid),
			format: FORMAT_DATE,

			setup: (picker: { on: (arg0: string, arg1: (date1: any, date2: any) => void) => void }) => {
				picker.on(
					'selected',
					(
						date1: { dateInstance: { toISOString: () => any } },
						date2: { dateInstance: { toISOString: () => any } }
					) => {
						stopWatch()
						let dateFormat = date1.dateInstance.toISOString()
						if (props.range) {
							dateFormat = `${date1.dateInstance.toISOString()}TO${date2.dateInstance.toISOString()}`
						}
						update(dateFormat)
					}
				)
			}
		},
		...props.config
	})
})

const clearDate = () => {
	picker.value.clearSelection()
	update(null)
}

defineExpose({
	clearDate: clearDate
})
</script>

<template>
	<FormWrapper :size="size" class="ui-form-datepicker" leadingIcon="event" :class="classList">
		<input class="form-control" :id="uid" autocomplete="off" :placeholder="placeholder" readonly :class="classList" />
		<template #trailingIcon v-if="!noClear">
			<Icon name="close" class="btn-remove" @click="clearDate" v-if="modelValue" />
		</template>
	</FormWrapper>
</template>

<style lang="scss">
@import './FormDatepicker.scss';
</style>
