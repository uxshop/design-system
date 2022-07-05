<script setup lang="ts">
import { getCurrentInstance, onMounted, shallowRef, watchEffect } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import Icon from '../icon/Icon.vue'
import { DateTime } from 'luxon'
import easepickStyle from './easepick.css'

import { easepick, RangePlugin } from '@easepick/bundle'

export interface Props {
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
		const date1 = DateTime.fromSQL(dates[0]).toFormat('dd/MM/yyyy')
		if (props.range && dates.length > 1) {
			const date2 = DateTime.fromSQL(dates[1]).toFormat('dd/MM/yyyy')
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
		const config: any = {
			element: el,
			format: FORMAT_DATE,
			plugins: [],
			css: easepickStyle,

			setup(picker) {
				picker.on('select', (e) => {
					stopWatch()

					const { start, end, date } = e.detail
					const sqlFormat = 'YYYY-MM-DD'
					let dateFormat = null

					if (props.range) {
						if (start instanceof Date && end instanceof Date) {
							dateFormat = `${start.format(sqlFormat)}TO${end.format(sqlFormat)}`
						}
					} else if (date instanceof Date) {
						dateFormat = date.format(sqlFormat)
					}

					update(dateFormat)
				})
			}
		}

		if (props.range) {
			config.plugins.push(RangePlugin)
			config.RangePlugin = {
				delimiter: ' ~ '
			}
		}

		picker.value = new easepick.create(config)
	}
})

const clearDate = () => {
	console.log("picker.value", picker.value)
	picker.value.clear()
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
