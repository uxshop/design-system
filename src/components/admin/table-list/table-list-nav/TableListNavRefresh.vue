<script setup lang="ts">
import IconButton from '../../../ui/icon-button/IconButton.vue'

const props = defineProps<{
	state: any
}>()

let refreshTime: ReturnType<typeof setTimeout> | number

const onRefreshTable = () => {
	if (!refreshTime) {
		refreshTime = setTimeout(() => (refreshTime = 0), 2000)
		props.state.fechData()
	}
}
</script>

<template>
	<span class="table-list-nav-item hide-sm" @click="onRefreshTable">
		<IconButton class="table-list-nav-btn" icon="refresh" size="sm" />
	</span>
</template>
