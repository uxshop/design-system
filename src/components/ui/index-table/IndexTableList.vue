<script setup lang='ts' generic="T extends object">
import Table from '#ds/components/admin/table/Table.vue';
import TableBody from '#ds/components/admin/table/TableBody.vue';
import TableCell from '#ds/components/admin/table/TableCell.vue';
import TableHeadCell from '#ds/components/admin/table/TableHeadCell.vue';
import TableRow from '#ds/components/admin/table/TableRow.vue';
import type { IndexTableListProps } from './types';

const props = defineProps<IndexTableListProps<T>>()
</script>

<template>
  <Table>
    <template #header>
        <TableHeadCell>
          Header 1
        </TableHeadCell>

        <TableHeadCell>
          Header 2
        </TableHeadCell>
    </template>

    <TableBody>
      <!-- Cada linha representa um objeto dentro do array -->
      <TableRow v-for="(item, index) in items" :key="index">
        <TableCell v-for="(cell, index) in Object.entries(item)" :key="index">
          <!-- Prop 1 -->
           <!-- TODO: o nome do slots será o atributo do objeto a ser exibido na célula -->
          <slot v-if="$slots[`${cell[0]}`]" :name="[`${cell[0]}`]" :item="item" :row="1" ></slot>
          <div v-else>{{ cell[1] }}</div>
        </TableCell>

        <TableCell>
          Prop 2
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style lang='scss' scoped>

</style>
