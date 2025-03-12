<script setup lang="ts">
import { computed } from 'vue';
import { useMaxLength } from '../form-wrapper/composables/useMaxLength';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import { valuesDefaultOfFormWrapperProps } from '../form-wrapper/valuesDefaultOfFormWrapperProps';
import type { FormTextareaEmits, FormTextareaProps } from './types';

const model = defineModel<string>();
const props = withDefaults(defineProps<FormTextareaProps>(), {
  rows: 4,
  ...valuesDefaultOfFormWrapperProps,
});
const emit = defineEmits<FormTextareaEmits>();

const classList = computed(() => [props.state === true ? '-valid' : props.state === false ? '-invalid' : '']);

const { currentMaxLength } = useMaxLength<FormTextareaProps>(props);

const update = (evt: Event) => {
  const target = evt.target as HTMLTextAreaElement;
  emit('update', target.value);
};

const onInternalState = (state: boolean | undefined) => {
  emit('internal-state', state);
};
</script>

<template>
  <FormWrapper
    :id
    v-model="model"
    :leading-icon
    :trailing-icon
    :label
    :loading
    :last
    :disabled
    :float
    :state
    :label-info
    :texts-counter
    :allow-exceed-max-length
    :invalid-feedback
    :help-feedback
    :minlength
    :maxlength
    :show-counter
    @internal-state="onInternalState">
    <textarea
      :id
      v-model="model"
      class="form-control"
      :class="classList"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :disabled="disabled"
      :minlength="minlength"
      :maxlength="currentMaxLength"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :tabindex="tabindex"
      :name="name"
      :title="title"
      :required="required"
      :rows="rows"
      @input="update" />
  </FormWrapper>
</template>
