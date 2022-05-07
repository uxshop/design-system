<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import Icon from '../icon/Icon.vue'
import * as Litepicker from 'litepicker'
import * as moment from 'moment'
moment.locale('pt-br')

interface Props {
	modelValue?: string
	config?: Record<string, unknown>
	placeholder?: string
	range?: boolean
	noClear?: boolean
	size?: string
}

const props = withDefaults(defineProps<Props>(), {
	config: () => {
		return {}
	}
})

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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const date1 = moment(dates[0]).format(FORMAT_DATE)
		if (props.range && dates.length > 1) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
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
	const el = document.getElementById(uid)
	if (el) {
		picker.value = new Litepicker({
			...{
				element: el,
				format: FORMAT_DATE,

				setup: (picker: any) => {
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
	}
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
