<script setup lang="ts">
defineProps<{
	transparent?: boolean
}>()
</script>

<template>
	<hr class="ui-divider -hr-2" :class="{ '-transparent': transparent }" />
</template>

<style lang="scss">
@import './Divider.scss';
</style>
