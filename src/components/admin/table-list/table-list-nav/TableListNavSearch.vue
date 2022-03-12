<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../../ui/icon/Icon.vue'

interface Props {
	modelValue: any
	setQueryParams(a: Record<string, any>): void
	removeFilter(a: string): void
	placeholder: string
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Procurar registros'
})

const term = ref()

const onClearTerm = () => {
	props.removeFilter('q')
}

const onSubmitTerm = () => {
	props.setQueryParams({
		q: props.modelValue,
		page: 1
	})
}

const update = () => {
	emit('update:modelValue', term.value)
}
</script>

<template>
	<span class="table-list-nav-item table-search">
		<form @submit.prevent="onSubmitTerm" autocomplete="off">
			<div class="table-search-input">
				<label class="box-icon" for="term">
					<icon name="search" class="icon" />
				</label>
				<input v-model="term" id="term" :placeholder="placeholder" class="form-control" @update:modelValue="update" />
				<div class="box-icon -clear" @click="onClearTerm" v-if="term">
					<icon name="close" class="icon" />
				</div>
			</div>
		</form>
	</span>
</template>

<style lang="scss">
@import './TableListNav.scss';
</style>
