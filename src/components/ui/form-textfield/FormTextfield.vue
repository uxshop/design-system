<script setup lang="ts">
import { vMaska } from 'maska';
import { computed } from 'vue';
import Button from '../button/Button.vue';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import Icon from '../icon/Icon.vue';

import type { MaskOptions } from 'maska';
import { useMaxLength } from '../form-wrapper/composables/useMaxLength';
import type { ValueOfFormText } from '../form-wrapper/types';
import { valuesDefaultOfFormWrapperProps } from '../form-wrapper/valuesDefaultOfFormWrapperProps';
import type { FormTextfieldEmits, FormTextfieldProps } from './types';

const model = defineModel<ValueOfFormText>();
const props = withDefaults(defineProps<FormTextfieldProps>(), {
  type: 'text',
  ...valuesDefaultOfFormWrapperProps,
});
const emit = defineEmits<FormTextfieldEmits>();

const { currentMaxLength } = useMaxLength<FormTextfieldProps>(props);

const classList = computed(() => [props.size ? `-${props.size}` : '']);

const maskOptions = computed<MaskOptions>(() => {
  return {
    mask: props.mask,
    eager: false,
  };
});

const update = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const val = target.value;

  emit('update', val);
};

const maskRawValue = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  if (model.value === target.value.replace(/\.|-/g, '')) return;

  update(evt);
  emit('updateRaw', target.dataset.maskRawValue);
};

const onFocus = (event: Event) => {
  emit('focus', event);
};

const onBlur = (event: Event) => {
  emit('blur', event);
};

const onKeydown = (event: Event) => {
  emit('keydown', event);
};

const onEnter = (event: Event) => {
  emit('keydownEnter', event);
};

const onClear = () => {
  model.value = null;

  emit('clear');
  emit('update', null);
};

const onInternalState = (state: boolean | undefined) => {
  emit('internal-state', state);
};
</script>

<template>
  <FormWrapper
    :id
    v-model="model"
    class="ui-form-textfield"
    :leading-icon
    :trailing-icon
    :trailing-text
    :label
    :loading
    :last
    :disabled
    :float
    :state
    :label-info
    :autofocus
    :size
    :texts-counter
    :allow-exceed-max-length
    :invalid-feedback
    :help-feedback
    :minlength
    :maxlength
    :show-counter
    @internal-state="onInternalState">
    <slot name="before" />
    <!-- @vue-ignore
      Ignora o erro do v-maska
    -->
    <input
      :id
      v-model="model"
      v-maska:[maskOptions]
      class="form-control"
      :mask="mask"
      :data-maska-tokens="dataMaskaTokens"
      :class="classList"
      :placeholder="!float ? placeholder : ''"
      :type
      :step
      :inputmode
      :autocomplete
      :disabled
      :minlength
      :maxlength="currentMaxLength"
      :pattern
      :autofocus
      :readonly
      :tabindex
      :name
      :title
      :max
      :min
      :required
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
      @keydown.enter="onEnter"
      @maska="maskRawValue" />
    <slot name="after" />
    <div v-if="clearable && model" class="close" @click="onClear">
      <Icon name="cancel" filled size="24" />
    </div>
    <template v-if="$slots.append || actions" #append>
      <div v-if="actions" class="actions">
        <Button
          v-for="item in actions"
          :key="item.label"
          :variant="item.variant"
          :type="item.type"
          :label="item.label"
          :leading-icon="item.leadingIcon"
          @click="item.onAction" />
      </div>
      <slot name="append" />
    </template>
  </FormWrapper>
</template>
