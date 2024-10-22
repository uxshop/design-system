<script setup lang="ts">
import { basicSetup } from 'codemirror';
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands';
import { EditorState, Compartment, Text } from '@codemirror/state';
import { EditorView, keymap, ViewUpdate } from '@codemirror/view';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { htmlLanguage, html } from '@codemirror/lang-html';
import { language } from '@codemirror/language';
import { css } from '@codemirror/lang-css';
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue';
import type { CodemirrorProps } from './types';

// const isMac = /Mac/.test(navigator.platform)
const languageConf = new Compartment();
const autoLanguage = EditorState.transactionExtender.of((tr) => {
  if (!tr.docChanged) return null;
  let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100));
  let stateIsHTML = tr.startState.facet(language) == htmlLanguage;
  if (docIsHTML == stateIsHTML) return null;
  return {
    effects: languageConf.reconfigure(docIsHTML ? html() : javascript()),
  };
});

const props = defineProps<CodemirrorProps>();

const emit = defineEmits(['update:modelValue']);
const editorRef = ref();
const cm = shallowRef();
const noUpdate = shallowRef();
const uid = `ui-codemirror-${getCurrentInstance()?.uid}`;

onMounted(() => {
  const el = document.querySelector(`#${uid}`) as Element;
  const updateListenerExtension = EditorView.updateListener.of((update: ViewUpdate) => {
    if (update.docChanged && !noUpdate.value) {
      stopWatch();
      const doc = update.state.doc as Text;
      const docFinal = Array(doc);
      const value = docFinal.join('\n');
      emit('update:modelValue', value);
    }

    noUpdate.value = false;
  });

  if (el) {
    cm.value = new EditorView({
      parent: el,
      state: EditorState.create({
        doc: props.modelValue,
        extensions: [
          basicSetup,
          updateListenerExtension,
          history(),
          syntaxHighlighting(defaultHighlightStyle),
          languageConf.of(css()),
          autoLanguage,
          keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        ],
      }),
    });
  }

  const stopWatch = watchEffect(() => {
    const update = cm.value.state.update({
      changes: { from: 0, to: cm.value.state.doc.length, insert: props.modelValue },
    });
    noUpdate.value = true;
    cm.value.update([update]);
  });
});
</script>

<template>
  <div :id="uid" ref="editorRef" class="ui-codemirror"></div>
</template>

<style>
@import './Codemirror.scss';
</style>
