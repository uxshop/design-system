<script setup lang="ts">
import { ref } from 'vue';
import FormCheckbox from '../form-checkbox/FormCheckbox.vue';
import IconButton from '../icon-button/IconButton.vue';
import FormTextfield from '../form-textfield/FormTextfield.vue';
import IndexTableOrderButton from './IndexTableOrderButton.vue';
import isMobile from '../../../services/MobileDetector';
import Button from '../button/Button.vue';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownItemButton from '../dropdown/DropdownItemButton.vue';

import type { IndexTableActionsEmits, IndexTableActionsProps, IndexTableActionsSlots } from './types';
import IndexTablePaginationItem from './IndexTablePaginationItem.vue';
import { useActionSelectAllItems } from './composables/useActionSelectAllItems';

const props = withDefaults(defineProps<IndexTableActionsProps>(), {
  show: () => ({
    select: true,
    reload: true,
    search: true,
    customFilters: true,
    filters: true,
    bulkActionDelete: true,
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
  checkboxSelectAllValue: false,
});
const emit = defineEmits<IndexTableActionsEmits>();
defineSlots<IndexTableActionsSlots>();

const { showBulkActions, checkboxAllSelected, checkboxAllSelectedIndeterminate, updateCheckboxAllSelected } =
  useActionSelectAllItems(emit, props);

const search = ref('');

const orderBy = (key: string) => emit('order-by', key);
</script>

<template>
  <div class="ui-index-table-actions-item">
    <div class="ui-index-table-actions-wrapper">
      <FormCheckbox
        v-if="show.select"
        id="index-table-select-all"
        v-model="checkboxAllSelected"
        class="ui-index-table-actions-checkbox"
        :value="checkboxAllSelected"
        :required="true"
        :indeterminate="checkboxAllSelectedIndeterminate"
        @update="updateCheckboxAllSelected" />

      <template v-if="!isLoading && !showBulkActions">
        <IconButton v-if="show.reload" size="md" icon="refresh" @click="emit('reload')" />

        <FormTextfield
          v-if="show.search"
          id="search-action"
          v-model="search"
          class="ui-index-table-actions-search"
          leading-icon="search"
          placeholder="Procurar registros"
          size="sm"
          clearable
          last
          @clear="emit('clear-search')"
          @keydown-enter="emit('search', search)" />

        <IndexTableOrderButton v-if="ordination" :ordination @order-by="orderBy" />

        <Button
          v-if="show.filters"
          :size="isMobile() ? 'md' : 'sm'"
          :label="isMobile() ? '' : 'Filtros'"
          leading-icon="filter_list"
          @click="emit('filters')" />

        <slot name="actions" />
      </template>
      <template v-else-if="showBulkActions && !isLoading">
        <Button
          v-if="show.bulkActionDelete"
          size="sm"
          leading-icon="delete"
          label="Deletar"
          @click="emit('delete-selected-items')" />

        <Dropdown v-if="bulkActions.length > 0" right>
          <template #button-content>
            <Button size="sm" leading-icon="unfold_more" label="Ação em massa" />
          </template>

          <DropdownItemButton
            v-for="action in bulkActions"
            :key="action.label"
            :label="action.label"
            @click.stop="emit('bulk-action', action.key)" />
        </Dropdown>

        <slot name="bulk-actions" />
      </template>
    </div>

    <template v-if="!showBulkActions && !isLoading">
      <IndexTablePaginationItem
        v-if="pagination"
        :page="pagination.page"
        :size="pagination.size"
        :total="pagination.total"
        :from="pagination.from"
        :to="pagination.to"
        @next-page="emit('next-page')"
        @previous-page="emit('previous-page')" />
      <slot v-else name="action-pagination" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './IndexTableActions.scss';
</style>
