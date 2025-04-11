<script setup lang="ts">
import { isObject } from 'lodash-es';
import { computed, onMounted, ref, useAttrs, watchEffect } from 'vue';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import { valuesDefaultOfFormWrapperBaseProps } from '../form-wrapper/valuesDefaultOfFormWrapperProps';
import type { FormSelectEmits, FormSelectProps } from './types';

const props = withDefaults(defineProps<FormSelectProps>(), {
  options: () => {
    return [];
  },
  ...valuesDefaultOfFormWrapperBaseProps,
});
const emit = defineEmits<FormSelectEmits>();

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

const onInternalState = (state: boolean | undefined) => {
  emit('internal-state', state);
};

const attrs = useAttrs();
const attrsToBind = {
  class: ['ui-form-select', attrs.class],
  style: attrs.style,
  tabindex: attrs.tabindex,
};

/**
 * Necessário desativar porque este componente não é compatível com todas as props do `FormWrapper`
 */
defineOptions({ inheritAttrs: false });
</script>

<template>
  <FormWrapper
    :id="id"
    v-bind="attrsToBind"
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
    :help-feedback
    @internal-state="onInternalState">
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
