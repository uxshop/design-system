<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from '../button/Button.vue';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownItemButton from '../dropdown/DropdownItemButton.vue';
import FormRadio from '../form-radio/FormRadio.vue';
import type { IndexTableOrderButtonEmits, IndexTableOrderButtonProps } from './types';

const prop = defineProps<IndexTableOrderButtonProps>();
const emit = defineEmits<IndexTableOrderButtonEmits>();

const activeOrder = computed(() => prop.ordination?.find((item) => item.active)?.key);
const orderValue = ref(activeOrder);
</script>

<template>
  <Dropdown ref="dropdownRef" class="ui-index-table-order-button">
    <template #button-content>
      <Button class="ui-index-table-order-button-action -mobile" label="" size="md" leading-icon="swap_vert" />
      <Button class="ui-index-table-order-button-action -desktop" label="Ordenar" size="sm" leading-icon="swap_vert" />
    </template>

    <DropdownItemButton
      v-for="item in ordination"
      :key="item.key"
      :active="item.active"
      @click="emit('order-by', item.key)">
      <FormRadio v-model="orderValue" :value="item.key" :label="item.label" no-events />
    </DropdownItemButton>
  </Dropdown>
</template>

<style lang="scss" scoped>
@import './IndexTableOrderButton.scss';
</style>
