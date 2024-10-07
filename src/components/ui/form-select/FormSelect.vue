<script setup lang="ts">
import { isObject } from 'lodash-es';
import { computed, ref, watchEffect } from 'vue';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import type { Size } from './../../../types';

export interface IFormSelectOptions {
  value: any;
  label?: string;
  disabled?: boolean;
}

export interface FormSelectProps {
  leadingIcon?: string;
  trailingIcon?: string;
  labelInfo?: string;
  trailingText?: string;
  loading?: boolean;
  last?: boolean;
  float?: boolean;
  modelValue?: any;
  value?: any;
  placeholder?: string;
  label?: string;
  id?: string;
  size?: Size;
  autofocus?: boolean;
  readonly?: boolean;
  tabindex?: string;
  name?: string;
  title?: string;
  required?: boolean;
  options?: IFormSelectOptions[];
  disabled?: boolean;
  state?: boolean;
  invalidFeedback?: string;
}

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

const model = ref(stringifyValue(props.modelValue));
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
</script>

<template>
  <FormWrapper
    :id="id"
    :leadingIcon="leadingIcon"
    :trailingIcon="trailingIcon"
    :trailingText="trailingText"
    :label="label"
    :loading="loading"
    :last="last"
    :disabled="disabled"
    :float="float"
    :labelInfo="labelInfo"
    :autofocus="autofocus"
    :size="size"
    :state="state"
    :invalidFeedback="invalidFeedback"
    class="ui-form-select">
    <select
      v-model="model"
      @input="update"
      class="form-control -select"
      :class="classList"
      :autofocus="autofocus"
      :readonly="readonly"
      :tabindex="tabindex"
      :name="name"
      :title="title"
      :id="id"
      :required="required"
      :disabled="disabled">
      <option class="form-select-option" value selected disabled v-if="placeholder">{{ placeholder }}</option>
      <slot />
      <option
        class="form-select-option"
        v-show="options.length"
        v-for="item in options"
        :value="stringifyValue(item.value)"
        :key="item.value"
        :disabled="item.disabled">
        {{ item.label }}
      </option>
    </select>
  </FormWrapper>
</template>

<style lang="scss">
@import './FormSelect.scss';
</style>
