<script setup lang="ts">
import { each, find, isFunction } from 'lodash-es';
import Tag from '../../../ui/tag/Tag.vue';
import { computed } from 'vue';
import { omit } from 'lodash-es';
import TagList from '../../../ui/tag/TagList.vue';
import { DateTime } from 'luxon';
import type { TableListTagsProps } from '../types';

const props = defineProps<TableListTagsProps>();

const removeFilter = props.state.removeFilter;

const translateKey = (item: string) => {
  let val = item;
  each(props.state.config.filters, (filter, key) => {
    if (item == key) {
      val = filter.name;
    }
  });
  return val;
};

const dateFormat = (date: any) => {
  let dates = date.split('--');
  const startDate = DateTime.fromSQL(dates[0]).toFormat('dd/MM/yyyy');

  if (dates.length > 1) {
    const endDate = DateTime.fromSQL(dates[1]).toFormat('dd/MM/yyyy');
    dates = `${startDate} ~ ${endDate}`;
  } else {
    dates = startDate;
  }

  return dates;
};

const translateValue = (item: any, key: string) => {
  const val: string[] = [];
  let values: number[] = [];

  if (!props.state.config.filters || !props.state.config.filters[key]) {
    return item;
  }

  if (key == 'created_at') {
    return dateFormat(item);
  }

  if (key == 'q' || key == 'category_ids') {
    return item;
  }

  if (['text', 'number'].indexOf(props.state.config.filters[key].type) >= 0) {
    return item;
  }

  if (isNaN(item)) {
    values = item.split(',');
  } else {
    values = [item];
  }

  each(props.state.config.filters, (item, k) => {
    if (k == key) {
      if (isFunction(item.filters)) {
        item.filters = item.filters();
      }

      each(values, (v) => {
        if (!isNaN(v)) {
          v = Number(v);
        }

        const obj = find(item.filters, { value: v });
        if (obj) {
          val.push(obj.name);
        }
      });
    }
  });

  return val.join(', ');
};

const showTags = computed(() => {
  const filters = omit(props.state.omitFilters, ['q']);

  return Object.keys(filters).length > 0;
});
</script>

<template>
  <TagList class="table-list-tags" v-if="showTags">
    <Tag
      variant="primary"
      label=""
      @remove="removeFilter(String(key))"
      v-for="(item, key) in state.omitFilters"
      v-show="String(key) != 'q'"
      :key="item">
      {{ translateKey(String(key)) }}: {{ translateValue(item, String(key)) }}
    </Tag>
  </TagList>
</template>

<style lang="scss">
.table-list-tags {
  padding: var(--s-spacing-x-small);
}
</style>
