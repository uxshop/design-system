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
        <th width="1" v-for="c in Number(withAction)" :key="c" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in Number(rows)" :key="r">
        <td width="1" v-if="withAvatar">
          <Skeleton width="30px" height="30px" style="border-radius: 100%" />
        </td>
        <td v-for="c in Number(cols)" :key="c">
          <Skeleton width="85%" />
          <Skeleton style="margin-top: 4px" width="40%" height="14px" v-if="Number(lines) > 1" />
        </td>
        <td width="1" v-for="c in Number(withAction)" :key="c">
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
