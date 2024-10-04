<script setup lang="ts">
import { ref, computed } from 'vue';
import Titlebar from '../titlebar/Titlebar.vue';
import PageMessageSupport from '../page-message-support/PageMessageSupport.vue';
import PageHelperVideo from '../page-helper-video/PageHelperVideo.vue';
import type { IVideo } from '../page-helper-video/types';
import PageHelperArticles, {
  type IArticle,
  type IArticlesHelper,
} from '../page-helper-articles/PageHelperArticles.vue';
import type { IAction } from '../../../types/IAction';

export interface Props {
  hideTitle?: boolean;
  primaryAction?: IAction;
  secondaryActions?: IAction[];
  to?: Record<string, any>;
  backlink?: { to: string };
  size?: 'sm' | 'md' | 'lg' | 'full';
  videoHelp?: IVideo;
  articlesHelp?: IArticle[];
  footerHelp?: any;
  title?: string;
  groupActions?: {
    name: string;
    actions: IAction[];
  };
}

const props = defineProps<Props>();
const classList = ref<string[]>([]);

const articlesHelp = computed<IArticlesHelper>(() => {
  const articlesHelp = {
    title: props?.title,
    articles: [] as IArticle[],
  };

  if (props?.articlesHelp?.length) {
    articlesHelp.articles = props.articlesHelp;
  }

  articlesHelp.articles = props.videoHelp?.articles || [];
  return articlesHelp as IArticlesHelper;
});

if (props.size) {
  classList.value.push(`-${props.size}`);
}
</script>

<template>
  <div class="ui-page" :class="classList">
    <Titlebar
      v-if="!props.hideTitle"
      :title="title"
      :to="to"
      :backlink="backlink"
      :groupActions="groupActions"
      :primary-action="primaryAction"
      :secondary-actions="secondaryActions">
      <template #titlebar-subtitle>
        <slot name="titlebar-subtitle" />
      </template>
    </Titlebar>
    <div v-if="videoHelp?.video_id" class="ui-page-help">
      <PageHelperVideo :video="videoHelp" />
      <PageHelperArticles
        v-if="!videoHelp?.video_id && !!articlesHelp?.articles?.length"
        :articles="articlesHelp.articles"
        :title="articlesHelp.title" />
    </div>
    <slot name="default" />
    <PageMessageSupport v-if="footerHelp" :name="footerHelp.name" :link="footerHelp.link" />
  </div>
</template>

<style lang="scss">
@import './Page.scss';
</style>
