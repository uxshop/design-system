<script setup lang="ts">
defineProps<{
	button: boolean
}>()
</script>

<template>
	<div class="ui-list-group-item" :class="{ '-button': button }">
		<slot />
	</div>
</template>

<style lang="scss">
@import '../../../scss/mixins.scss';
@import './ListGroupItem.scss';
</style>
