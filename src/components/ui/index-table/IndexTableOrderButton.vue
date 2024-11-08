<script setup lang="ts">
import { computed, ref } from 'vue';
import isMobile from '../../../services/MobileDetector';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownItemButton from '../dropdown/DropdownItemButton.vue';
import FormRadio from '../form-radio/FormRadio.vue';
import Button from '../button/Button.vue';
import type { IndexTableOrderButtonEmits, IndexTableOrderButtonProps } from './types';

const prop = defineProps<IndexTableOrderButtonProps>();
const emit = defineEmits<IndexTableOrderButtonEmits>();

const activeOrder = computed(() => prop.ordination?.find((item) => item.active)?.key);
const orderValue = ref(activeOrder);
</script>

<template>
  <Dropdown ref="dropdownRef">
    <template #button-content>
      <Button :label="isMobile() ? '' : 'Ordenar'" :size="isMobile() ? 'md' : 'sm'" leading-icon="swap_vert" />
    </template>

    <DropdownItemButton
      v-for="item in ordination"
      :key="item.key"
      :active="item.active"
      @click.stop="emit('order-by', item.key)">
      <FormRadio v-model="orderValue" :value="item.key" :label="item.label" no-events />
    </DropdownItemButton>
  </Dropdown>
</template>

<style lang="scss" scoped>
//@import './indexTableOrderButton.scss';
</style>
