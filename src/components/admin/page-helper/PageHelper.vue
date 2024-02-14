<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'

export interface IPageHelper {
	helperName: string
	helperLink?: string
}

defineProps<IPageHelper>()
const emit = defineEmits<{
	(event: 'onClickLink'): void
}>()
</script>

<template>
	<div class="ui-page-helper" @click="emit('onClickLink')">
		<icon name="info" filled size="24" />
		<span>
			<b>Precisa de ajuda?</b> Acesse o material sobre
			<b v-if="!!helperLink">
				<a :href="helperLink" v-text="helperName" target="_blank" class="ui-page-helper-name"/>
			</b>
			<b v-else class="ui-page-helper-name"> {{ helperName }}</b>
		</span>
	</div>
</template>

<style lang="scss">
@import './PageHelper.scss';
</style>
