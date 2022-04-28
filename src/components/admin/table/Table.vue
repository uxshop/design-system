<script setup lang="ts">
defineEmits(['click'])
defineProps<{
	hover?: boolean
	noPadding?: boolean
}>()
</script>
<template>
	<div class="table-responsive">
		<div class="ui-table" :class="{ '-hover': hover, '-no-padding': noPadding }">
			<div v-if="$slots.header" class="ui-table-header">
				<div class="ui-table-row">
					<slot name="header" />
				</div>
			</div>
			<slot name="body" />
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './Table.scss';
</style>
