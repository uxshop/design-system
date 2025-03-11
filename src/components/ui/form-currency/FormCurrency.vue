<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { CurrencyDisplay, useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import type { FormCurrencyEmits, FormCurrencyProps } from './types';

const props = withDefaults(defineProps<FormCurrencyProps>(), {
  state: undefined,
  placeholder: '0.00',
  max: 999999.99,
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
  (newVal: any) => {
    if (newVal === null) return;

    setValue(parseFloat(newVal));
    emit('update:modelValue', newVal);
  },
  { immediate: true }
);

watch(
  () => focused.value,
  (newVal: any) => {
    if (!newVal) return;
    emit('change', newVal);
  },
  { immediate: true }
);

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
    :label
    :loading
    :last
    :disabled
    :label-info
    :float
    :size
    :invalid-feedback>
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
