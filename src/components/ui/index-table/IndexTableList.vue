<script setup lang='ts' generic="T extends object">
import Table from '#ds/components/admin/table/Table.vue';
import TableBody from '#ds/components/admin/table/TableBody.vue';
import TableCell from '#ds/components/admin/table/TableCell.vue';
import TableHeadCell from '#ds/components/admin/table/TableHeadCell.vue';
import TableRow from '#ds/components/admin/table/TableRow.vue';
import FormCheckbox from '#ds/components/ui/form-checkbox/FormCheckbox.vue';
import { ref } from 'vue';
import type { IndexTableListProps } from './types';

const props = withDefaults(defineProps<IndexTableListProps<T>>(), {
  show: () => ({
    select: true,
  }),
})

 const selectedItem = ref([])
</script>

<template>
  <Table>
    <template #header>
        <TableHeadCell v-if="show.select" >
        </TableHeadCell>
        <TableHeadCell v-for="(col, index) in fields" :key="index" >
          <slot v-if="$slots[`col-${col.key}`]" :name="[`${col.key}`]" :data="col" ></slot>
          <div v-else>{{ col.label }}</div>
        </TableHeadCell>
    </template>

    <TableBody>
      <TableRow v-for="(item, indexRow) in items" :key="indexRow">
        <TableCell v-if="show.select" >
          check
          <FormCheckbox :model-value="selectedItem" :value="indexRow" noEvents />
        </TableCell>
        <TableCell v-for="(cell, indexCel) in Object.entries(item)" :key="indexCel">
          <slot v-if="$slots[`${cell[0]}`]" :name="[`${cell[0]}`]" :item="item" :row="1" ></slot>
          <div v-else>{{ cell[1] }}</div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style lang='scss' scoped>

</style>
