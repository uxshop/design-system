<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'

export interface IPageHelper {
	helperName: string
	helperLink?: string
}

defineProps<IPageHelper>()
const emit = defineEmits<{
	(event: 'clicked'): void
}>()
</script>

<template>
	<div class="ui-page-helper">
		<icon name="info" filled />
		<span>
			<b>Precisa de ajuda?</b> Acesse o material sobre
			<b v-if="!!helperLink">
				<a :href="helperLink" class="ui-page-helper-name" v-text="helperName" target="_blank" />
			</b>
			<b v-else class="ui-page-helper-name" @click="emit('clicked')"> {{ helperName }}</b>
		</span>
	</div>
</template>

<style lang="scss">
@import './PageHelper.scss';
</style>
