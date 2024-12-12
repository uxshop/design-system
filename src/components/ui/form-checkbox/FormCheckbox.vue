<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import type { FormCheckboxProps } from './types';

const emit = defineEmits(['update:modelValue', 'update']);
const props = defineProps<FormCheckboxProps>();

const uid = props.id ?? `ui-form-checkbox-${getCurrentInstance()?.uid}`;
const classList = computed(() => [
  props.switch ? `-switch` : '',
  props.disabled ? `-disabled` : '',
  props.noEvents ? `-no-events` : '',
]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    update(newValue);
  },
});

const update = (val: unknown) => {
  emit('update', val);
  emit('update:modelValue', val);
};
</script>

<template>
  <label class="ui-form-checkbox" :for="uid" :class="classList" tabindex="0">
    <input
      v-model="model"
      type="checkbox"
      :id="uid"
      :value="value"
      :tabindex="tabindex"
      :required="required"
      :indeterminate="indeterminate"
      :name="name"
      :disabled="disabled"
      :true-value="true"
      :false-value="false"
      @update:modelValue="update" />
    <span class="ui-form-checkbox-checkmark"></span>
    <div v-if="label || $slots.default" class="ui-form-checkbox-text">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<style lang="scss">
@import './FormCheckbox.scss';
</style>
