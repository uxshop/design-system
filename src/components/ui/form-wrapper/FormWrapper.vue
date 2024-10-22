<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, useSlots } from 'vue';
import Icon from '../icon/Icon.vue';
import Spinner from '../spinner/Spinner.vue';
import vTooltip from '../../../directives/tooltip';
import type { FormWrapperProps } from './types';

const props = defineProps<FormWrapperProps>();
const elementRef = ref<Element>();
const uid = ref(props.id || `__VID__${getCurrentInstance()?.uid}`);

const slots = useSlots();
onMounted(() => {
  nextTick(() => {
    // @ts-expect-error expected
    const input: HTMLElement[] = elementRef.value?.querySelectorAll('input, textarea, select');

    if (input && input[0]) {
      input[0].setAttribute('id', uid.value);

      if (props.autofocus) {
        input[0].focus();
      }

      if (props.float) {
        input[0].setAttribute('placeholder', ' ');
      }
    }
  });
});

const classList = computed(() => [
  'ui-form-wrapper',
  props.leadingIcon && '-with-leading-icon',
  props.trailingIcon && '-with-trailing-icon',
  props.loading && '-loading',
  props.last && '-last',
  (props.disabled || props.loading) && '-disabled',
  props.float && '-float',
  props.size && `-${props.size}`,
]);

const inputValidation = computed(() => (props.state === true ? '-valid' : props.state === false ? '-invalid' : ''));
</script>

<template>
  <div ref="elementRef" :class="[...classList, inputValidation]">
    <div class="form-wrapper-label" v-if="!float && props.label">
      <label class="form-control-label" :for="uid" v-html="props.label"></label>
      <span v-if="labelInfo" v-tooltip:top="labelInfo" class="form-wrapper-label-icon">
        <Icon name="help" class="icon" :size="14" />
      </span>
    </div>

    <div class="ui-form-wrapper-main">
      <div class="form-wrapper-content-item form-wrapper-content-bx">
        <Icon class="leading-icon" :name="leadingIcon" v-if="leadingIcon" :size="20" />
        <slot />

        <div class="form-wrapper-notched">
          <div class="form-wrapper-notched-prepend"></div>
          <div class="form-wrapper-notched-label" v-if="float">
            <label class="form-wrapper-label" :for="uid" v-html="props.label"></label>
          </div>
          <div class="form-wrapper-notched-append"></div>
        </div>

        <div class="trailing-wrapper">
          <Icon class="trailing-icon" :name="trailingIcon" v-if="trailingIcon && !loading" :size="20" />
          <span class="trailing-icon-text" v-if="trailingText">{{ trailingText }}</span>
          <slot name="trailingIcon" />
        </div>

        <div class="form-control-loader" v-if="loading">
          <Spinner class="form-control-loader-spinner" />
        </div>
      </div>
      <div class="form-wrapper-append" v-if="slots.append">
        <slot name="append" />
      </div>
    </div>

    <div class="form-invalid-feedback" v-if="state === false && invalidFeedback">
      {{ invalidFeedback }}
    </div>
  </div>
</template>

<style lang="scss">
@import './FormWrapper.scss';
</style>
