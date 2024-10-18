<script setup lang="ts">
import { ref } from 'vue';
import FormValidation from '../../ui/form-validation/FormValidation.vue';
import Savebar from '../savebar/Savebar.vue';
import type { FormRegisterProps } from './types';

const emit = defineEmits(['save']);
const props = defineProps<FormRegisterProps>();

const sending = ref();
const formError = ref<Record<string, string[]> | undefined>(undefined);
const buttonSubmitRef = ref();

const onSubmit = async () => {
  if (!props.editing || !props.resource) {
    return;
  }

  if (!sending.value) {
    sending.value = true;

    try {
      emit('save');
    } catch (error) {
      formError.value = error as Record<string, string[]>;
    }

    setTimeout(() => {
      sending.value = false;
    }, 1000);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" id="form-register" class="ui-form-register">
    <Savebar :editing="editing" />
    <FormValidation v-model="formError" :translate="validate" />
    <slot />
    <button
      ref="buttonSubmitRef"
      tabindex="-1"
      type="submit"
      style="opacity: 0; width: 0; height: 0; border: none; padding: 0; position: absolute" />
  </form>
</template>
