<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '#ds/index';
import type { IndexTablePaginationItemEmits, IndexTablePaginationItemProps } from '../types';

const props = withDefaults(defineProps<IndexTablePaginationItemProps>(), {
  isInternalLoading: false,
  from: 0,
  to: 0,
  total: 0,
  page: 1,
});
const emit = defineEmits<IndexTablePaginationItemEmits>();

/**
 * Valida automaticamente se deve exibir ou ocultar a quantidade de itens na paginação
 */
const shouldShowNumberOfPagination = computed(() => !props.emptyResultDisplay.show);

const onNextPage = () => {
  emit('next-page');
};
const onPreviousPage = () => {
  emit('previous-page');
};
</script>

<template>
  <div class="ui-index-table-pagination" data-test-index-table="pagination-item">
    <div
      v-show="from && shouldShowNumberOfPagination"
      class="ui-index-table-pagination-item"
      data-test-index-table="pagination-quantity">
      {{ from }} - {{ to }} {{ total ? 'de ' + total : '' }}
    </div>

    <Button
      class="ui-index-table-pagination-previous"
      size="md"
      leading-icon="arrow_back"
      only-icon
      :disabled="1 === page || isInternalLoading"
      data-test-index-table="pagination-previous-page"
      @click="onPreviousPage" />

    <Button
      size="md"
      leading-icon="arrow_forward"
      only-icon
      :disabled="to === total || isInternalLoading"
      data-test-index-table="pagination-next-page"
      @click="onNextPage" />
  </div>
</template>

<style lang="scss" scoped>
@use 'IndexTablePaginationItem';
</style>
