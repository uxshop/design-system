<script setup lang="ts">
import Row from '../../ui/grid/row/Row.vue';
import Col from '../../ui/grid/col/Col.vue';
import Card from '../../ui/card/Card.vue';
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue';
import IconButton from '../../ui/icon-button/IconButton.vue';
import { $dialog } from '../../ui/dialog';
import type { CardActiveProps } from './types';

const emit = defineEmits(['delete', 'toggleActive', 'update:modelValue']);

const props = withDefaults(defineProps<CardActiveProps>(), {
  modelValue: () => ({ active: true }),
});

const onDelete = async () => {
  $dialog.delete({
    title: 'Remover o registro',
    message: `A ação removerá o registro ${props.modelValue.name}.`,
    onCallback: async () => {
      if (props.delete && props.modelValue.id) {
        await props.delete(props.modelValue.id);
      }

      emit('delete', { id: props.modelValue.id });
    },
  });
};

const onClickActive = (e: Event) => {
  if (props.preventActive) {
    props.preventActive();
    e.preventDefault();
  }
};

const changeActive = () => {
  emit('toggleActive', props.modelValue.active);
};
</script>

<template>
  <Card class="ui-card-active">
    <Row alignV="center">
      <Col>
        <FormCheckbox v-model="modelValue.active" switch @change="changeActive" @click.stop="onClickActive">
          <span v-show="modelValue.active">Ativo</span>
          <span v-show="!modelValue.active">Inativo</span>
        </FormCheckbox>
      </Col>
      <Col auto>
        <IconButton v-if="!hideDelete && modelValue.id" icon="delete" @click="onDelete" />
      </Col>
    </Row>
  </Card>
</template>
