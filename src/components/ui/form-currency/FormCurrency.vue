<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue';
import { CurrencyDisplay, useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import { valuesDefaultOfFormWrapperBaseProps } from '../form-wrapper/valuesDefaultOfFormWrapperProps';
import type { FormCurrencyEmits, FormCurrencyProps } from './types';

const props = withDefaults(defineProps<FormCurrencyProps>(), {
  placeholder: '0.00',
  max: 999999.99,
  ...valuesDefaultOfFormWrapperBaseProps,
});
const emit = defineEmits<FormCurrencyEmits>();
const focused = ref(false);

const classList = computed(() => [
  'form-control',
  props.state === true ? '-valid' : props.state === false ? '-invalid' : '',
]);

/* @see https://dm4t2.github.io/vue-currency-input/config.html */
const settings: CurrencyInputOptions = {
  locale: 'pt-BR',
  currency: 'BRL',
  currencyDisplay: CurrencyDisplay.symbol,
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  useGrouping: true,
  accountingSign: false,
};

const { inputRef, setValue, setOptions } = useCurrencyInput(settings);

onMounted(() => {
  if (props.autofocus) focused.value = props.autofocus;

  if (props.options) {
    setOptions({
      ...props.options,
      valueRange: {
        min: props.min,
        max: props.max,
      },
    });
  }
});

watch(
  () => props.modelValue,
  (newVal: string | number | null | undefined) => {
    if (!newVal) return;

    if (typeof newVal === 'number') newVal = newVal.toString();

    setValue(parseFloat(newVal));
    emit('update:modelValue', newVal);
  },
  { immediate: true }
);

watch(
  () => focused.value,
  (newVal: boolean) => {
    if (!newVal) return;
    emit('change', newVal);
  },
  { immediate: true }
);

const onInternalState = (state: boolean | undefined) => {
  emit('internal-state', state);
};

const attrs = useAttrs();
const attrsToBind = {
  class: attrs.class,
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
    data-form="currency"
    :leading-icon
    :trailing-icon
    :label
    :loading
    :last
    :disabled
    :label-info
    :float
    :state
    :autofocus
    :size
    :invalid-feedback
    :help-feedback
    @internal-state="onInternalState">
    <input
      ref="inputRef"
      :class="classList"
      :placeholder="float ? '' : placeholder"
      :disabled
      :required
      :readonly
      :autocomplete
      @focus="focused = true"
      @blur="focused = false" />
  </FormWrapper>
</template>
