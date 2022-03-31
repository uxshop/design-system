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
		<table class="table" :class="{ '-hover': hover, '-no-padding': !noPadding }">
			<thead>
				<tr>
					<slot name="header" />
				</tr>
			</thead>
			<slot name="body" />
			<tbody>
				<slot />
			</tbody>
		</table>
	</div>
</template>
