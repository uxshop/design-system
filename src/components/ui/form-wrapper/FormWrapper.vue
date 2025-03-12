<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, useSlots, watch } from 'vue';
import vTooltip from '../../../directives/tooltip';
import Icon from '../icon/Icon.vue';
import Spinner from '../spinner/Spinner.vue';
import { useCharacterCount } from './composables/useCharacterCount';
import type { FormWrapperEmits, FormWrapperProps, ValueOfFormText } from './types';
import { valuesDefaultOfFormWrapperProps } from './valuesDefaultOfFormWrapperProps';

const model = defineModel<ValueOfFormText>();
const props = withDefaults(defineProps<FormWrapperProps>(), valuesDefaultOfFormWrapperProps);
const emit = defineEmits<FormWrapperEmits>();

const elementRef = ref<Element>();
const uid = ref<string>(crypto.randomUUID());
const slots = useSlots();

onMounted(() => {
  uid.value = props.id || `__VID__${getCurrentInstance()?.uid}`;

  nextTick(() => {
    const element: undefined | NodeListOf<HTMLInputElement> =
      elementRef.value?.querySelectorAll('input, textarea, select');

    if (element && element[0]) {
      element[0].setAttribute('id', uid.value);

      if (props.autofocus) element[0].focus();

      if (props.float) element[0].setAttribute('placeholder', ' ');
    }
  });
});

const { counterText, shouldShowCounterText, shouldShowCounter, internalState } = useCharacterCount(model, props);

const classList = computed(() => [
  'ui-form-wrapper',
  props.leadingIcon && '-with-leading-icon',
  props.trailingIcon && '-with-trailing-icon',
  props.loading && '-loading',
  props.last && '-last',
  (props.disabled || props.loading) && '-disabled',
  props.float && '-float',
  props.size && `-${props.size}`,
  {
    '-valid': internalState.value === true,
    '-invalid': internalState.value === false,
  },
]);

watch(internalState, (newState) => {
  emit('internal-state', newState);
});
</script>

<template>
  <div ref="elementRef" :class="classList">
    <div v-if="!float && props.label" class="form-wrapper-label">
      <label class="form-control-label" :for="uid" v-html="props.label"></label>
      <span v-if="labelInfo" v-tooltip:top="labelInfo" class="form-wrapper-label-icon">
        <Icon name="help" class="icon" :size="14" />
      </span>
    </div>

    <div class="ui-form-wrapper-main">
      <div class="form-wrapper-content-item form-wrapper-content-bx">
        <Icon v-if="leadingIcon" class="leading-icon" :name="leadingIcon" :size="20" />
        <slot />

        <div class="form-wrapper-notched">
          <div class="form-wrapper-notched-prepend"></div>
          <div v-if="float" class="form-wrapper-notched-label">
            <label :for="uid" class="form-wrapper-label" v-html="props.label"></label>
          </div>
          <div class="form-wrapper-notched-append"></div>
        </div>

        <div class="trailing-wrapper">
          <Icon v-if="trailingIcon && !loading" class="trailing-icon" :name="trailingIcon" :size="20" />
          <span v-if="trailingText" class="trailing-icon-text">{{ trailingText }}</span>
          <slot name="trailingIcon" />
        </div>

        <div v-if="loading" class="form-control-loader">
          <Spinner class="form-control-loader-spinner" />
        </div>
      </div>
      <div v-if="slots.append" class="form-wrapper-append">
        <slot name="append" />
      </div>
    </div>

    <div v-if="internalState === false" class="form-invalid-feedback">
      <template v-if="invalidFeedback">
        {{ invalidFeedback }}
      </template>
      <template v-else-if="shouldShowCounterText('invalid') && shouldShowCounter">
        {{ counterText }}
      </template>
    </div>
    <div v-else-if="internalState !== true" class="form-help-feedback">
      <template v-if="helpFeedback">
        {{ helpFeedback }}
      </template>
      <template v-else-if="shouldShowCounterText('help') && shouldShowCounter">
        {{ counterText }}
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import './FormWrapper.scss';
</style>
