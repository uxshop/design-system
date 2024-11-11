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
      <TableRow>
        <TableCell>
          Prop 1
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
