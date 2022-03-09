<template>
	<div v-if="modelValue != null" class="form-validation">
		<ui-alert variant="danger" show :title="title" :dismissible="!noDismissible" @dismissed="removeErrors">
			<ul v-for="(item, key) in modelValue" :key="key">
				<li v-for="val in item" :key="val">
					{{ val }}
				</li>
			</ul>
		</ui-alert>
	</div>
</template>

<script>
import { watchEffect } from 'vue'
import UiAlert from '../alert/Alert.vue'

export default {
	components: { UiAlert },
	props: {
		modelValue: Object,
		noDismissible: Boolean,
		noTitle: Boolean,
		title: {
			type: String,
			default: 'Erros encontrados'
		},
		translate: {
			type: Object,
			default: () => ({})
		}
	},
	setup(props, { emit }) {
		const removeErrors = () => {
			emit('update:modelValue')
		}

		watchEffect(() => {
			if (props.modelValue && props.modelValue.length) {
				// window.scrollTo(0, 0)

				props.modelValue.map((item, key) => {
					// $('.form-error-' + key).addClass('error')
				})
			}
		})

		return {
			removeErrors
		}
	}
}
</script>
