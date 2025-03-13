<script setup lang="ts">
import { isObject } from 'lodash-es';
import { computed, onMounted, ref, watchEffect } from 'vue';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import type { FormSelectProps } from './types';

const props = withDefaults(defineProps<FormSelectProps>(), {
  options: () => {
    return [];
  },
  state: undefined,
});

const emit = defineEmits(['update:modelValue', 'update']);

const parseValue = (val: string) => {
  if (/\{/.test(val)) {
    return JSON.parse(val);
  }

  return val;
};

const stringifyValue = (val: any) => {
  if (isObject(val)) {
    return JSON.stringify(val);
  }

  return val === null ? '' : val;
};

const update = (evt: Event) => {
  const target = evt.target as HTMLSelectElement;
  const val = target.value;
  emit('update:modelValue', parseValue(val));
  emit('update', parseValue(val));
  model.value = target.value;
};

const model = ref('');
onMounted(() => {
  model.value = stringifyValue(props.modelValue);
});

const classList = computed(() => [
  props.size && `-${props.size}`,
  props.float && '-float',
  props.loading && '-loading',
  props.last && '-last',
  (props.disabled || props.loading) && '-disabled',
]);

const updateModelValue = () => {
  const valueToUse = props.value !== undefined ? props.value : props.modelValue;
  model.value = stringifyValue(valueToUse);

  if (props.modelValue === null) {
    model.value = '';
  }
};

watchEffect(updateModelValue);

/** Necessário desativar devido a incompatibilidade atual com este componente e algumas props do `FormWrapper` */
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <FormWrapper
    :id="id"
    :leading-icon
    :trailing-icon
    :trailing-text
    :label
    :loading
    :last
    :disabled
    :float
    :label-info
    :invalid-feedback
    :autofocus
    :size
    :state
    class="ui-form-select">
    <select
      :id="id"
      v-model="model"
      class="form-control -select"
      :class="classList"
      :autofocus="autofocus"
      :readonly="readonly"
      :tabindex="tabindex"
      :name="name"
      :title="title"
      :required="required"
      :disabled="disabled"
      @input="update">
      <option v-if="placeholder" class="form-select-option" value selected disabled>{{ placeholder }}</option>
      <slot />
      <option
        v-for="item in options"
        v-show="options.length"
        :key="item.value"
        class="form-select-option"
        :value="stringifyValue(item.value)"
        :disabled="item.disabled">
        {{ item.label }}
      </option>
    </select>
  </FormWrapper>
</template>

<style lang="scss">
@import './FormSelect.scss';
</style>
