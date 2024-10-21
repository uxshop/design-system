<script setup lang="ts">
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue';
import { ref, watch } from 'vue';
import { indexOf } from 'lodash-es';
import type { IRow, RowExcludeProps } from './types';

const emit = defineEmits(['update:modelValue', 'update']);
const props = defineProps<RowExcludeProps>();
const includes = ref<number[]>([]);

const onClickRowExclude = (item: IRow) => {
  if (indexOf(includes.value, item.id) != -1) {
    includes.value = includes.value.filter((id) => {
      return id != item.id;
    });
  } else {
    includes.value.push(item.id);
  }

  updateExcludes();
};

const updateExcludes = () => {
  if (props.rows) {
    const excludes: Array<number> = [];
    props.rows.map((item: IRow) => {
      if (indexOf(includes.value, item.id) == -1) {
        excludes.push(item.id);
      }
    });
    emit('update', excludes);
    emit('update:modelValue', excludes);
  }
};

const updateIncludes = () => {
  if (props.rows) {
    includes.value = [];
    props.rows.map((item: IRow) => {
      if (indexOf(props.modelValue, item.id) == -1) {
        includes.value.push(item.id);
      }
    });
  }
};

watch([() => props.modelValue, () => props.rows], () => updateIncludes(), { immediate: true });
</script>

<template>
  <div class="selectable-list">
    <div
      class="selectable-list-item"
      :class="{ '-selected': includes.includes(item.id) }"
      v-for="item in rows"
      :key="item.id"
      @click.stop="onClickRowExclude(item)">
      <FormCheckbox v-model="includes" :value="item.id" />
      <span class="selectable-list-item-text">{{ item.name }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@import './RowExclude.scss';
</style>
