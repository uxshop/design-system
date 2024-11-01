<script setup lang="ts">
import { ref } from 'vue';
import FormCheckbox from '../form-checkbox/FormCheckbox.vue';
import IconButton from '../icon-button/IconButton.vue';
import FormTextfield from '../form-textfield/FormTextfield.vue';
import IndexTableOrderButton from './IndexTableOrderButton.vue';
import isMobile from '../../../services/MobileDetector';
import Button from '../button/Button.vue';

import type { IndexTableActionsEmits, IndexTableActionsProps, IndexTableActionsSlots } from './types';
import IndexTablePaginationItem from './IndexTablePaginationItem.vue';

const props = withDefaults(defineProps<IndexTableActionsProps>(), {
  show: () => ({
    select: true,
    reload: true,
    search: true,
    order: true,
    customFilters: true,
    filters: true,
  }),
  ordination: null,
  pagination: () => ({
    page: 1,
    size: 25,
    total: 100,
    from: 1,
    to: 25,
  }),
  activeFilterTags: () => [],
  isLoading: false,
});
const emit = defineEmits<IndexTableActionsEmits>();
const slots = defineSlots<IndexTableActionsSlots>();

const checkbox = ref(true);

const search = ref('');

// TODO: criar computado em cima do valor do checkbox de seleção que verifica se tem todos ou apenas 1 item selecionado
const showBulkActions = ref(false);
</script>

<template>
  <div v-if="!isLoading && !showBulkActions" class="index-table-actions-item">
    <div class="index-table-actions-wrapper">
      <FormCheckbox
        v-if="show.select"
        v-model="checkbox"
        class="index-table-actions-checkbox"
        :indeterminate="true"
        :value="false"
        no-events
        @click="emit('select-all', checkbox)" />

      <IconButton v-if="show.reload" size="md" icon="refresh" @click="emit('reload')" />

      <FormTextfield
        v-if="show.search"
        id="search-action"
        v-model="search"
        class="index-table-actions-search"
        leading-icon="search"
        placeholder="Procurar registros"
        size="sm"
        clearable
        last
        @clear="emit('clear-search')" />

      <IndexTableOrderButton v-if="show.order && ordination" :ordination />

      <Button
        v-if="show.filters"
        :size="isMobile() ? 'md' : 'sm'"
        :label="isMobile() ? '' : 'Filtros'"
        leading-icon="filter_list"
        @click="emit('filters')" />
    </div>

    <slot name="actions" />

    <div v-if="pagination">
      <IndexTablePaginationItem
        :page="pagination.page"
        :size="pagination.size"
        :total="pagination.total"
        :from="pagination.from"
        :to="pagination.to"
        @next-page="emit('next-page')"
        @previous-page="emit('previous-page')" />
    </div>
    <slot v-else name="pagination" />
  </div>
</template>

<style lang="scss" scoped>
@import './IndexTableActions.scss';
</style>
