<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'
import { cloneDeep } from 'lodash-es'

import choices, { templates } from 'choices.js'
import FormLabel from '../form-label/FormLabel.vue'

export interface Props {
	modelValue?: any
	options?: any[]
	placeholder?: string
	choices?: any
	label?: string
	size?: string
	last?: boolean
	templates?: any
	position?: 'top' | 'bottom' | 'auto'
}

const emit = defineEmits(['update:modelValue', 'open', 'close', 'update'])
const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Selecione',
	config: () => ({}),
	position: 'bottom'
})

const uid = `ui-form-select-${getCurrentInstance()?.uid}`
const element = shallowRef()
const focus = ref(false)

const getTemplateChoice = (data: any) => {
	return props.templates.choice(data)
}

const settings = computed(() => {
	const _choices = props.choices
	const config: any = {
		searchEnabled: true,
		searchChoices: true,
		removeItems: true,
		position: props.position,
		removeItemButton: true,
		addItems: true,
		placeholder: true,
		noResultsText: 'Nenhum resultado encontrado',
		noChoicesText: 'Sem opções para escolher',
		items: [],
		choices: _choices,
		allowHTML: false
	}

	if (props.templates) {
		config.callbackOnCreateTemplates = function (template: any) {
			return {
				choice: ({ classNames }: any, data) => {
					return template(`
							<div
							class="${classNames.item} ${classNames.itemChoice} ${
						data.disabled ? classNames.itemDisabled : classNames.itemSelectable
					}"
						data-select-text="${this.config.itemSelectText}"
						data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'}
						data-id="${data.id}"
						data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}
						>
							${getTemplateChoice(data)}
						</div>
					`)
				}
			}
		}
	}
	return config
})

const init = () => {
	console.log('init')

	nextTick(() => {
		if (element.value) {
			element.value.destroy()
		}

		const el = document.querySelector(`#${uid}`)

		if (el) {
			element.value = new choices(el, settings.value)
			checkModelValue()

			el.addEventListener(
				'change',
				function (event) {
					update(element.value.getValue(true))
					// element.value.hideDropdown()
				},
				false
			)
		}
	})
}

const update = (val: string) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const checkModelValue = () => {
	nextTick(() => {
		if (element.value) {
			element.value.setChoiceByValue(props.modelValue)
		}
	})
}

watch(
	() => props.modelValue,
	() => {
		checkModelValue()
	}
)

watch(
	() => [props.choices],
	() => init(),
	{ deep: true, immediate: true }
)
</script>

<template>
	<div class="ui-form-autocomplete" :class="[{ '-focus': focus, 'mb-0': last }, `-${size}`]">
		<FormLabel v-if="label" :label="label" />
		<select class="ui-form-select" :id="uid">
			<option value="" disabled selected>{{ placeholder }}</option>
		</select>
	</div>
</template>

<style lang="scss">
@import 'choices.js/src/styles/choices.scss';
@import './FormAutocomplete.scss';
</style>
