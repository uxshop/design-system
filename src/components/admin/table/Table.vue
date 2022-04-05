<script setup lang="ts">
interface Props {
	hover?: boolean
	noPadding?: boolean
}

defineEmits(['click'])
defineProps<Props>()
</script>
<template>
	<div class="table-responsive">
		<table class="ui-table table" :class="{ '-hover': hover, '-no-padding': noPadding }">
			<thead class="ui-table-header">
				<tr class="ui-table-row">
					<slot name="header" />
				</tr>
			</thead>
			<slot name="body" />
			<slot />
		</table>
	</div>
</template>
