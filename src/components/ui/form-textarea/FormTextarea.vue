<script setup lang="ts">
import { computed } from 'vue';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import type { InputMode } from '../../../types';

interface Props {
  leadingIcon?: string;
  trailingIcon?: string;
  state?: boolean;
  loading?: boolean;
  last?: boolean;
  float?: boolean;
  invalidFeedback?: string;
  modelValue?: any;
  rows?: string | number;
  label?: string;
  placeholder?: string;
  tabindex?: string;
  inputmode?: InputMode;
  id?: string;
  pattern?: string;
  title?: string;
  name?: string;
  autocomplete?: string;
  minlength?: string | number;
  maxlength?: string | number;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  labelInfo?: string;
}

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'update', val: string): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  state: undefined,
});

const classList = computed(() => [props.state === true ? '-valid' : props.state === false ? '-invalid' : '']);

const update = (evt: Event) => {
  const target = evt.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('update', target.value);
};
</script>

<template>
  <FormWrapper
    :id="id"
    :leadingIcon="leadingIcon"
    :trailingIcon="trailingIcon"
    :label="label"
    :loading="loading"
    :last="last"
    :disabled="disabled"
    :float="float"
    :state="state"
    :labelInfo="labelInfo"
    :invalidFeedback="invalidFeedback">
    <textarea
      class="form-control"
      @input="update"
      :value="modelValue"
      :class="classList"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :disabled="disabled"
      :minlength="minlength"
      :maxlength="maxlength"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :tabindex="tabindex"
      :name="name"
      :title="title"
      :id="id"
      :required="required"
      :rows="rows" />
  </FormWrapper>
</template>
