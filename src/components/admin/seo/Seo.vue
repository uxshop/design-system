<script setup lang="ts">
import Row from '../../ui/grid/row/Row.vue';
import Col from '../../ui/grid/col/Col.vue';
import Alert from '../../ui/alert/Alert.vue';
import AlertTitle from '../../ui/alert/AlertTitle.vue';
import { computed, ref, watchEffect } from 'vue';
import { slugify as _slugify, truncate } from '../../../filters';
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue';
import FormLayoutItem from '../../ui/form-layout/FormLayoutItem.vue';
import type { SeoProps } from './types';

const props = withDefaults(defineProps<SeoProps>(), {
  slugify: true,
  keyTitle: 'meta_title',
  keySubTitle: 'meta_subtitle',
  keyDescription: 'meta_description',
});

const TITLE_SEPARATOR = ' | ';

const metaTitle = ref('');
const metaSubtitle = ref<string | number | null>('');
const urlRewrite = ref('');
const metaDescription = computed(() => {
  const desc = formatMetaDescription(props.modelValue[props.keyDescription] || '');
  return truncate(desc, 250, '...');
});

const emit = defineEmits(['update:modelValue']);

const seoModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

const formatMetaTitle = (value: string) => {
  if (value && props.metaTitle && !props.isMetaTitle) {
    value = value + TITLE_SEPARATOR + props.metaTitle;
  }

  return value;
};

const formatMetaDescription = (value: any) => {
  if (value) {
    value = value.replace(/(<([^>]+)>)/gi, '');
  }

  return value;
};

watchEffect(() => {
  if (props.modelValue) {
    metaTitle.value = formatMetaTitle(props.modelValue[props.keyTitle] || props.modelValue.name || metaTitle.value);
    metaSubtitle.value = props.modelValue[props.keySubTitle] || null;
    urlRewrite.value = !!props.modelValue.slug ? _slugify(props.modelValue.slug) : _slugify(metaTitle.value);
  }
});
</script>

<template>
  <div class="ui-seo" :class="{ '-gray': gray }">
    <Row>
      <Col v-if="!viewOnly">
        <FormLayoutItem>
          <FormTextfield v-model="seoModelValue.meta_title" placeholder="Meta title" label="Meta title" />
        </FormLayoutItem>
        <FormLayoutItem>
          <FormTextfield
            v-model="seoModelValue.meta_description"
            placeholder="Meta description"
            label="Meta description"
            maxlength="250"
            type="textarea" />
        </FormLayoutItem>
        <FormLayoutItem>
          <FormTextfield
            v-model="seoModelValue.meta_keywords"
            placeholder="Ex: palavra1, palavra2"
            label="Meta keywords"
            maxlength="200" />
        </FormLayoutItem>
        <FormLayoutItem>
          <FormTextfield v-model="seoModelValue.slug" placeholder="Ex: minha-url-amigavel" label="Url amigável" />
        </FormLayoutItem>
      </Col>
      <Col v-if="!writeOnly">
        <div class="ui-seo-card">
          <b class="ui-seo-title">
            {{ metaTitle }}
            <span v-if="metaSubtitle">- {{ metaSubtitle }}</span>
          </b>
          <span class="ui-seo-domain">
            https://{{ domain }}<span v-show="urlRewrite && slugify === true">/{{ urlRewrite }}</span>
          </span>
          <div class="ui-seo-description" v-if="metaDescription">
            {{ metaDescription }}
          </div>
        </div>
      </Col>
    </Row>
    <Alert :show="!viewOnly" class="mt-4">
      <AlertTitle>Dicas de cadastro</AlertTitle>
      <ul>
        <li><b>Meta title</b>: até 90 caracteres; Google exibe somente 63</li>
        <li><b>Meta description</b>: até 250 caracteres; Google exibe somente 160</li>
        <li><b>Meta keywords</b>: até 200 caracteres, separados por vírgula</li>
      </ul>
    </Alert>
    <Alert variant="warning" :show="!viewOnly" icon="warning" last>
      Importante: a plataforma se encarrega de preencher estes dados básicos automaticamente. Caso você opte por
      preenchê-los manualmente, o sistema irá ignorar os dados gerados de forma dinâmica e exibirá os dados que você
      cadastrou.
    </Alert>
  </div>
</template>

<style lang="scss">
@import './Seo.scss';
</style>
