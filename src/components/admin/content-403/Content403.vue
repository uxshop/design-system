<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

interface OwnerInterface {
  email?: string;
}

interface Props {
  owner?: OwnerInterface;
}

withDefaults(defineProps<Props>(), {
  owner: () => ({}),
});

onMounted(() => {
  document.body.classList.add('forbidden');
});

onUnmounted(() => {
  document.body.classList.remove('forbidden');
});
</script>

<template>
  <div class="content-403">
    <div class="empty-center">
      <div class="empty-info">
        Você não tem permissão para acessar este conteúdo.
        <br />Entre em contato com o administrador da <br />conta
        <span class="text-primary">{{ owner.email }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './Content403.scss';
</style>
