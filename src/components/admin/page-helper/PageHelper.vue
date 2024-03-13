<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'

export interface IPageHelper {
	helperName: string
	helperLink?: string
}

const props = defineProps<IPageHelper>()
const emit = defineEmits<{
	(event: 'onClickLink'): void
}>()

function onClickLink() {
	emit('onClickLink')
	if (props.helperLink) window.open(props.helperLink, 'blank')
}
</script>

<template>
	<div class="ui-page-helper" @click="onClickLink">
		<icon name="info" filled size="24" />
		<span>
			<b>Precisa de ajuda?</b> Acesse o material sobre <b class="ui-page-helper-name"> {{ helperName }}</b>
		</span>
	</div>
</template>

<style lang="scss">
@import './PageHelper.scss';
</style>
