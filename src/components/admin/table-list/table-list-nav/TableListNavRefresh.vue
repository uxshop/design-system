<script setup lang="ts">
import IconButton from '../../../ui/icon-button/IconButton.vue';

const props = defineProps<{
  state: any;
}>();

let refreshTime: ReturnType<typeof setTimeout> | number;

const onRefreshTable = () => {
  if (!refreshTime) {
    refreshTime = setTimeout(() => (refreshTime = 0), 2000);
    props.state.fetchData();
  }
};
</script>

<template>
  <span class="table-list-nav-item" @click="onRefreshTable">
    <IconButton size="md" class="table-list-nav-btn" icon="refresh" />
  </span>
</template>
