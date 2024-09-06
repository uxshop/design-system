<script setup lang="ts">
import { computed } from 'vue';
import { IDropdownItem } from './types';

const props = defineProps<IDropdownItem>()
const labelUpperCase =computed(() => props.label?.toUpperCase())
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
    <span class="ui-dropdown-item -caption">
      <slot>{{ labelUpperCase }}</slot>
    </span>
	</div>
</template>
