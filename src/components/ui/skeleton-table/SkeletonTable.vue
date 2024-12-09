<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import Skeleton from '../skeleton/Skeleton.vue';
import type { SkeletonTableProps } from './types';

const props = withDefaults(defineProps<SkeletonTableProps>(), {
  cols: 5,
  padding: '16px',
  rows: 3,
});

const skeletonTableStyleList = computed(() => {
  const styles: StyleValue = {};

  if (props.width) {
    styles.width = props.width;
  }

  return styles;
});
</script>

<template>
  <table class="ui-table ui-skeleton-table" :style="skeletonTableStyleList" :class="{ '-no-border': noBorder }">
    <thead v-if="!hideHeader">
      <tr>
        <th v-if="withAvatar" />
        <th v-for="c in Number(cols)" :key="c">
          <Skeleton />
        </th>
        <th v-for="c in Number(withAction)" :key="c" width="1" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in Number(rows)" :key="r">
        <td v-if="withAvatar" width="1">
          <Skeleton width="30px" height="30px" style="border-radius: 100%" />
        </td>
        <td v-for="c in Number(cols)" :key="c">
          <Skeleton width="85%" />
          <Skeleton v-if="Number(lines) > 1" style="margin-top: 4px" width="40%" height="14px" />
        </td>
        <td v-for="c in Number(withAction)" :key="c" width="1">
          <Skeleton width="32px" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@import './SkeletonTable.scss';
.ui-skeleton-table th,
.ui-skeleton-table td {
  padding: v-bind('padding');
}
</style>
