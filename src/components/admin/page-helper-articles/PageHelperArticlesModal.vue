<script setup lang="ts">
import { ref } from 'vue';
import Aside from '../../ui/aside/Aside.vue';
import Link from '../../ui/link/Link.vue';
import type { IArticle, PageHelperArticlesProps } from './types';

const aside = ref(false);
const itemTitle = ref('Ajuda');
const helperArticles = ref<IArticle[]>();

const open = (item: PageHelperArticlesProps) => {
  helperArticles.value = item.articles;
  if (item.title) itemTitle.value = item.title;
  aside.value = true;
};

defineExpose({
  open,
});
</script>

<template>
  <Aside
    v-model="aside"
    title="Ajuda"
    subtitle="Para encontrar ainda mais informações, explore nossos artigos disponíveis na base de conhecimento.
"
    size="sm">
    <div class="page-helper-articles">
      <ul class="page-helper-articles-list">
        <li class="page-helper-articles-item" v-for="item in helperArticles" :key="item.url">
          <Link :href="item.url" target="_blank">
            {{ item.name }}
          </Link>
        </li>
      </ul>
    </div>
  </Aside>
</template>

<style lang="scss">
.page-helper-articles {
  &-support {
    margin-bottom: 0;
    padding: 0 0 var(--s-spacing-small);
    display: inline-block;
  }

  &-list {
    padding-left: 0;
    list-style: none;
  }

  &-item {
    margin-bottom: 0;
    padding: var(--s-spacing-xx-small) 0;
    border-top: var(--s-border-light);

    &:first-child {
      margin-bottom: 0;
      padding-top: 0;
      border: 0;
    }
  }
}
</style>
